


$(document).ready(function(){
    // Constants
    const products = [
        {
            id: 1,
            name: "Americano",
            price:3.5,
            description: "Good Black Cofee sold in the west ",
            image:"./Assets/shop/coffee1dark.png",
            rollover: "./Assets/shop/coffee1light.png"
    
    
    },
        {
            id: 2,
            name: "Cappuccino",
            price:4.6,
            description: "Odd tasting delight, meant for the original tech bros, having a mid life",
            image:"./Assets/shop/cake1dark.png",
            rollover: "./Assets/shop/cake1light.png"
    
    
    },
    
    {
        id: 3,
        name: "Bread",
        price:0.6,
        description: "Specially baked and soft, meant to go with cappucino",
        image:"./Assets/shop/coffee2dark.png",
        rollover: "./Assets/shop/coffee2light.png"
    },
    
    {
        id: 4,
        name: "Green Tea",
        price:3.5,
        description: "Round and sweet delight, meant to go with any cofee, a police favorite  ",
        image:"./Assets/shop/coffee3dark.png",
        rollover: "./Assets/shop/coffee3light.png"


},
    {
        id: 5,
        name: "Strawberry Cupcake",
        price:4.6,
        description: "looks like a cup, tastes great, a company recommendation ",
        image:"./Assets/shop/cake2dark.png",
        rollover: "./Assets/shop/cake2light.png"


},

{
    id: 6,
    name: "Tea",
    price:0.6,
    description: "Odd tasting delight, meant for the original tech bros",
    image:"./Assets/shop/coffee4dark.png",
    rollover: "./Assets/shop/coffee4light.png"
},

    
    ]

    let total = 0.00;
    // Render product items
    for(let product of products){
        // preload the images for better UX 
        $('<img />').attr('src',product.rollover).appendTo('body').css('display','none');
        
        //product card template (component)
        let productCard = `
        <article class="product_card" product_id="${product.id}">
        <img src="${product.image}" id="${product.rollover}" alt="${product.name}" >
        <div class="description">

            <h3>${product.name}:</h3>
            <p>${product.description}</p>
            <p class="price">$ ${product.price}</p>
        </div>
    </article>
        `
        $(".product_container").append(productCard)
    }

    // Instantiate variables
    $("#total span").append(`${total}`)
    // session storage
    if(!localStorage.getItem("orders")){
        localStorage.setItem("orders", JSON.stringify([]))

    }
    localStorage.setItem("Total", "")




    $(".order_list").on("click",".remove_btn",function(){
        //if multiplier not present, just remove
        // alert("omo")
        const product_id= $(this).attr("product_id")

        let orders = JSON.parse(localStorage.getItem("orders"))
        let newOrders = orders.filter(item=>{ return item.id != product_id})
        localStorage.setItem("orders", JSON.stringify(newOrders))

        //clear and rerender
        $(".order_list").empty()
        for(let product of newOrders){
            let orderItem = `

        <div class="order_item">

        <li>$${product.price} - ${product.name}</li>
        <button class="remove_btn" product_id="${product.id}">-</button>
      </div>
        `
            $(".order_list").append(orderItem)
        }

        


    })
    //Product Card Events
   
    $('.product_card').mouseenter(function(e){
       let productImage = $(this).find("img")
       let rolloverImg =  productImage.attr("id")
       let originalImg = productImage.attr("src")
        $(this).find(".description").toggleClass("showDescription")
        productImage.attr("src", rolloverImg)   
        productImage.attr("id", originalImg) 

    })
    $('.product_card').mouseleave(function(){
        let productImage = $(this).find("img")
        let rolloverImg =  productImage.attr("id")
        let originalImg = productImage.attr("src")
        $(this).find(".description").toggleClass("showDescription")
        productImage.attr("src", rolloverImg) 
        productImage.attr("id", originalImg) 
 

    })
   
    // Click an image to update total and order list
    // TODO: improve UI
    // TODO: use a multiplier instead of writing the same item again and again 
    // TODO: Add products 
     
    $('.product_card').click(function(){

        let productId = $(this).attr("product_id")
        // store product in local storage to persist and manage state
        let orders = JSON.parse(localStorage.getItem("orders"))
        let product = products.find(item=>{ return item.id == productId})
        orders.push(product)
        localStorage.setItem("orders", JSON.stringify(orders))
        
        total = total + product.price
        $("#total span").empty().append(total.toFixed(2))
        localStorage.setItem("Total", total.toFixed(2))
        // Add order Item template with remove button
        let orderItem = `

        <div class="order_item">

        <li>$${product.price} - ${product.name}</li>
        <button class="remove_btn" product_id="${product.id}">-</button>
      </div>
        `
        $(".order_list").append(orderItem)


    })

   

    //clear order
    $("#clear").click(function(){
        localStorage.setItem("orders", JSON.stringify([]))
        $(".order_list").empty()
        total=0
        $("#total span").empty().append("0.00")
    })

    
   
    
})