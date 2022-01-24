const preiceNotebook = document.querySelectorAll(".price");

preiceNotebook.forEach((item) => {
  item.textContent = new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(item.textContent);
});

const $cart = document.querySelector("#cart");
console.log($cart);
if ($cart) {
  $cart.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;

      fetch("/cart/remove/" + id, {
        method: "delete"
      })
        .then((res) => res.json())
        .then((cart) => {
          console.log(cart)
          if (cart.notebooks.length) {
            const dynamicHtml = cart.notebooks
              .map((c) => {
                return `
              <tr>
                <td><img src="${c.img}" alt="${c.title}" /></td>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                <button
                class="btn btn-small yellow darken-1 waves-effect waves-light"
              >+</button>
              <button
                class="btn btn-small red darken-5 waves-effect waves-light"
              >-</button>
              <button
                class="btn btn-small js-remove red darken-1 waves-effect waves-light"
                data-id="${c._id}"
              >Del</button>
                </td>
              </tr>
            `;
              })
              .join("");
            $cart.querySelector("tbody").innerHTML = dynamicHtml;
            $cart.querySelector(".price").textContent = cart.total_price;
            console.log(dynamicHtml);
          } else {
            $cart.innerHTML = `
            <div class="container-fluid mt-100 z-depth-4">
            <div class="basket card">
              <div class="card-title">
                <h3>Cart</h3>
              </div>
              <div class="card-content cart">
                <div class="col-sm-12 empty-cart-cls text-center">
                  <img
                    src="https://i.imgur.com/dCdflKN.png"
                    width="130"
                    height="130"
                    class="img-fluid mb-4 mr-3"
                  />
                  <h3><strong>Your Cart is Empty</strong></h3>
                  <h4>Add something to make me happy \u{1F60A}</h4>
                  <a
                    href="/notebooks"
                    class="btn blue darken-3 waves-effect waves-dark"
                    data-abc="true"
                  >continue shopping</a>
                </div>
              </div>
            </div>
          </div>
            `
          }
        });
    }
  });
}

//tabs config
M.Tabs.init(document.querySelectorAll('.tabs'));



/////

document.addEventListener("DOMContentLoaded",function(){
  var body=document.querySelector('.not_found');
   setInterval(createStar,100);
   function createStar(){
     var right=Math.random()*500;
     var top=Math.random()*screen.height;
     var star=document.createElement("div");
  star.classList.add("star")
   body.appendChild(star);
   setInterval(runStar,10);
     star.style.top=top+"px";
   function runStar(){
     if(right>=screen.width){
       star.remove();
     }
     right+=3;
     star.style.right=right+"px";
   }
   } 
 })
