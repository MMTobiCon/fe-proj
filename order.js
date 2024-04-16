


$(document).ready(function(){
    // Constants
    const products = [
        {
            id: 1,
            name: "Americano",
            price:3.5,
            description: "a really weird coffee i somehow like idk ",
            image:"./Assets/shop/coffee1dark.png",
            rollover: "./Assets/shop/coffee1light.png"
    
    
    },
        {
            id: 2,
            name: "Cappuccino",
            price:4.6,
            description: "Odd tasting delight, meant for the original tech bros, having a mid life crisis coffee i somehow like idk ",
            image:"./Assets/shop/cake1dark.png",
            rollover: "./Assets/shop/cake1light.png"
    
    
    },
    
    {
        id: 3,
        name: "Bread",
        price:0.6,
        description: "Odd tasting delight, meant for the original tech bros",
        image:"./Assets/shop/coffee2dark.png",
        rollover: "./Assets/shop/coffee2light.png"
    },
    
    {
        id: 4,
        name: "Americano",
        price:3.5,
        description: "a really weird coffee i somehow like idk ",
        image:"./Assets/shop/coffee3dark.png",
        rollover: "./Assets/shop/coffee3light.png"


},
    {
        id: 5,
        name: "Cappuccino",
        price:4.6,
        description: "Odd tasting delight, meant for the original tech bros, having a mid life crisis coffee i somehow like idk ",
        image:"./Assets/shop/cake2dark.png",
        rollover: "./Assets/shop/cake2light.png"


},

{
    id: 6,
    name: "Bread",
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
    $('.product_card').click(function(){
        let productId = $(this).attr("product_id")
        let product = products.find(item=>{ return item.id == productId})
        // total =0
        total = total + product.price
        $("#total span").empty().append(total)
        
        let orderItem = `

        <li>$${product.price} - ${product.name}</li>
      
        `
        $(".order_list").append(orderItem)


    })

    //clear order
    $("#clear").click(function(){
        $(".order_list").empty()
        total=0
        $("#total span").empty().append("0.00")
    })

    
   
    
})