//Éxécuter apres que la page soit loadé
$(function () {
    console.log('produit')
    $.ajax({ //retourne un liste
        url: "/produits",
        success: function( result ) {
            console.log('START')
            console.log(result)
            for (let i = 0; i < result.length; i++) {
                console.log("Iteration " + i)
                $("#list_items").append(createProduct(result[i].nom, result[i].prix, result[i].qte_inventaire, result[i].categorie.nom, result[i].categorie.description))
            }
        }
    });
    // retourne le string du template avec les attributs aux bons endroits
    const createProduct = (nom, prix, qte, categorie, description) => {
        return `<div class=\"col-md-3\">\n 
                    <div class=\"card mb-4 rounded-3 shadow-sm\">\n
                        <div class=\"card-header py-3 \">\n
                            <h4 class=\"my-0 fw-normal\">${nom}</h4>\n
                        </div>\n
                        <div class=\"card-body \">\n
                                <h1 class=\"card-title text-center\">$${prix}</h1>\n
                                <ul class=\"list-unstyled mt-3 mb-4\">\n
                                    <li style="font-size:12px">Qte disponible :${qte}</li>\n
                                    <li style="font-size:12px">Categorie :${categorie} </li>\n
                                    <br>
                                    <li style="font-size:12px">${description}</li>
                                </ul>\n
                                <p class=\"w-100 display-6 text-center\"><i class=\"bi bi-cart-plus\"></i></p>\n
                        </div>\n
                    </div>\n
               </div>`
    }
});