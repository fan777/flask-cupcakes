const BASE_URL = "http://127.0.0.1:5000/api"

function generateCupcakeHTML(cupcake) {
  return `
    <div id="${cupcake.id}"><li>${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating} / [<a href="#">x]</a></li>
      <img src="${cupcake.image}">
    </div>
  `;
}

async function showCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`)

  for (let cupcake of response.data.cupcakes) {
    const cupcakeHTML = $(generateCupcakeHTML(cupcake));
    $("#cupcakes-list").append(cupcakeHTML);
  }
}

$("#cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();
  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image = $("#image").val();

  const response = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });
  let cupcakeHTML = $(generateCupcakeHTML(response.data.cupcake));
  $("#cupcakes-list").append(cupcakeHTML)
  $("#cupcake-form").trigger("reset");
});

$("#cupcakes-list").on("click", "a", async function (evt) {
  let id = $(evt.target).parent().parent().attr('id');
  let response = await axios.delete(`${BASE_URL}/cupcakes/${id}`)
  if (response.data.message === 'deleted') {
    $(evt.target).parent().parent().remove();
  }
})

$(showCupcakes);
