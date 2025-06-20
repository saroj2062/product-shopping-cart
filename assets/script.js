   let result = [];
   const fetchingData = async () =>{
    try{
      const response = await fetch("data.json");
      if(!response.ok)
      {
        console.error(response.status);
      }
    result = await response.json();
    console.log(result);

    desertCreation();
    }
    catch(error)
    {
      console.log("fetching error",error)
    }
    
   }

   const desertCreation = () =>{

    const desertList = document.querySelector(".desert-menu-list");

    desertList.innerHTML = "";

    result.forEach((desert,index)=>{

      desertList.innerHTML += ` <div class="desert-container">
      <article class="desert-image-container  ">
        <img   src="${desert.image["desktop"]}" alt="Desert Image">
      </article>
     <div class="cart-adder-bottom-container">
            <div class="cart-btm " onclick="clicked(${index})">
            Add to Cart
            </div>
              <div class="clicked">
                                
                <button class="decrement" onClick="orderValue(${index},'decrement')"><img src="assets/images/icon-decrement-quantity.svg" alt="decrement"></button>

              <span class="desertCardValue">0</span>
              <button class="increment" onClick="orderValue(${index},'increment')"><img src="assets/images/icon-increment-quantity.svg" alt="desert image"></button>
    
              </div>
  

        </div>
        <div class="desert-detail-container">
        <span id="desert-name"> ${desert.category}</span>
        <h5 id="desert-title">${desert.name}</h5>
        <span id="desert-price"> $${desert.price}</span>
        </div>
    </div>`;

    })
  }

   const clicked = (selectedDesert)=> {
    const cartBtm = document.querySelectorAll(".cart-btm");
    const clickedDesign = document.querySelectorAll(".clicked");

    cartBtm[selectedDesert].style.display="none";
    clickedDesign[selectedDesert].style.display="flex";
   }

const orderValue = (selectedDesert,type)=>{
  const desertCardValue =  document.querySelectorAll(".desertCardValue");
  let  value = parseInt(desertCardValue[selectedDesert].innerText);
  
  if(type ===  "decrement" && value > 0)
  {
      value = value -1;
     desertCardValue[selectedDesert].innerText = value ;
     addToCart(value,selectedDesert);
     conformation(value,selectedDesert);
  }
 else if (type === "increment"){
      value = value + 1 ;
       desertCardValue[selectedDesert].innerText = value ;
         addToCart(value,selectedDesert);
         conformation(value,selectedDesert);

 }
}

// result displaying part code 

  const addToCart = (value,selectedIndex)=>
  {
    const selectedDesert = result[selectedIndex];
    const pricingEmptyDesign = document.querySelector(".pricing-empty-design-container");
    const orderListingDesign = document.querySelector(".order-listed-container");
  const OrderContainer = document.querySelector(".order-list");
    pricingEmptyDesign.style.display="none";
    orderListingDesign.style.display="block";
    
  const totalSingleDesert = value * selectedDesert.price;
 
   const existedDesert = document.querySelector(`#order-${selectedIndex}`)
  if(value === 0)
  {
   // removeOrder(selectedIndex);
  }


   
    if(existedDesert)
    {
      // Get the old price 
      const oldPriceStr = existedDesert.querySelector("#desert-total-price").innerHTML;
      const oldPrice = removingDollorShine(oldPriceStr)  ;

      // update ui
      existedDesert.querySelector("#quantity").innerHTML=`x${value}`;
          existedDesert.querySelector("#desert-total-price").innerHTML=`$${totalSingleDesert}`;
      
        
          updatingtotalPrice(totalSingleDesert - oldPrice);
    }
  else{
   
     updatingtotalPrice(totalSingleDesert);
  OrderContainer.innerHTML += `  <div class="order" id="order-${selectedIndex}" >
      <div class="order-title">
        <h5>${selectedDesert.name}</h5>
        <button onClick="removeOrder(${selectedIndex})"><img src="assets/images/icon-remove-item.svg" alt=""></button>
      </div>
      <div class="order-price-quantity">
        <span id="quantity">x${value}</span>
        <div class="price">
          <span id=" single-price">@$${selectedDesert.price}</span>
          <span id="desert-total-price">$${totalSingleDesert}</span>
        </div>

      </div>
    

    </div>`;
    

  }
  }
  const removingDollorShine = (value )=>{
    return parseFloat(value.replace(/\$/g,''));
  }
  const updatingtotalPrice = (singleTotalPrice)=>{
    const totalPriceContainer= document.getElementById('total');
  let total = totalPriceContainer.innerText;

  total = removingDollorShine(total) ;    
    total+= singleTotalPrice;
   
    
    totalPriceContainer.innerHTML=`$${total.toFixed(2)}`;

  }

  const removeOrder = (index)=>{

      const order = document.getElementById(`order-${index}`);
      if(order)
      {
        order.remove();
      }

       const priceStr = order.querySelector("#desert-total-price").innerHTML;
      const price= removingDollorShine(priceStr)  ;
   
      updatingtotalPrice(-price);

  const orderContainer = document.querySelector(".order-list");
      const pricingEmptyDesign = document.querySelector(".pricing-empty-design-container");
    const orderListingDesign = document.querySelector(".order-listed-container");

    if(orderContainer.children.length === 0)
    {
      pricingEmptyDesign.style.display="block";
      orderListingDesign.style.display = "none";
    }
     document.querySelectorAll(".desertCardValue")[index].innerText = "0";
    document.querySelectorAll(".cart-btm")[index].style.display = "block";
     document.querySelectorAll(".clicked")[index].style.display= "none";



  }

  const conformation = (orderValue,index)=>{

    const desertContainer = document.querySelector('.desert-ordered-list');
    const selectedDesert = result[index];
    const existedDesert = document.getElementById(`conformation-${index}`);

   if(orderValue === 0)
   {
    existedDesert.remove();
   }
   
    if(existedDesert)
    {
      existedDesert.querySelector('#quantity').innerText = `${orderValue}X`;
      existedDesert.querySelector('#conformation-desert-total-price').innerText=`$${orderValue*selectedDesert.price}`;
    
    }
else{
    desertContainer.innerHTML +=` <div class="conformation-order-container" id="conformation-${index}">
     <div class="conformation-order" >
    <article class="order-img-container">
      <img src="${selectedDesert.image['thumbnail']}" alt="thumnail picture">
    </article>
    <div class="order-detail-container">
        <div class="order-title">
        <h5>${selectedDesert.name}</h5>
      </div>
      <div class="order-price-quantity">
        <span id="quantity">${orderValue}x</span>
        <div class="price">
          <span id=" single-price">@$${selectedDesert.price}</span>
          
        </div>

      </div>
    </div>
      </div>


  <div id="conformation-desert-total-price">$${orderValue*selectedDesert.price}</div>
    
    </div>
  

</div>
    `
}
  }


  const submittingOrder = ()=>{
    const popBox = document.querySelector('.pop-up-box');
    popBox.style.display="flex";

    const conformationTotal = document.querySelector('#conformation-total');
    
    conformationTotal.innerHTML = document.querySelector("#total").innerHTML;
  }

  const reset = ()=>{
    
  }
   fetchingData();