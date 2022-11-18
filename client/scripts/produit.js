//Éxécuter apres que la page soit loadé
$(function () {
    console.log('produit')
    $.ajax({
        url: "/clients/"+1+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k");
        },
        success: function( result ) {
            console.log("hello darkness my o0ld friend")
            console.log("Result " + result )
            for(let i = 0; i<result.items.length; i++) {
                if(result.items[i].quantite !== 0)
                    $('.tablePanier').append(chargerRow(result.items[i]))
            }
            $('.totalPanier').text(`Total: $${result.valeur.toFixed(2)}`)
        }
    });
    $.ajax({
        url: "/clients/"+1+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k");
        },
        success: function( result ) {
            console.log(result)
            calculTotalPanier(result)
        }
    });
    $.ajax({ //retourne un liste
        url: "/produits",
        success: function( result ) {
            console.log(result)
            for (let i = 0; i < result.length; i++) {
                $("#list_items").append(createProduct(result[i].nom, result[i].prix, result[i].qte_inventaire, result[i].categorie.nom, result[i].categorie.description, result[i].id))
            }
        }
    });
    // retourne le string du template avec les attributs aux bons endroits
    const createProduct = (nom, prix, qte, categorie, description, id_item) => {
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
                                <p class="w-100 display-6 text-center">
                                    <button type="button" class="btn btn-primary position-relative" onclick="add_item(${id_item})">
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                </p>\n
                        </div>\n
                    </div>\n
               </div>`
    }

});

const add_item = (id_item) => {
    console.log("Appel add_item avec id: " + id_item)
    $.ajax({
        url: "/clients/"+1+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k");
        },
        success: function( result ) {
            console.log(result)
            calculTotalPanier(result)
        }
    });
}

const calculTotalPanier = (result) => {
    let total = 0;
    for(let i = 0; i < result.items.length; i++) {
        total += result.items[i].quantite
    }
    $('#item_counter').text(total)
}

//
// const chargerPanier = () => {
//     $.ajax({
//         url: "/"+1+"/panier",
//         method:"GET",
//         beforeSend: function (xhr){
//             xhr.setRequestHeader('Authorization', "Basic "+
//                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k");
//         },
//         error: function( result ) {
//             console.log("FUCK"+result)
//         },
//         success: function( result ) {
//             console.log("hello darkness my o0ld friend")
//             for(let i = 0; i<result.items.length; i++) {
//                 $('.tablePanier').append(chargerRow(result.items[i]))
//             }
//         }
//     });
// }

const chargerRow = (obj) => {
    let total = obj.quantite * obj.prix
    return `<tr>
                <td class="panierElem">${obj.nomProduit}</td>
                <td class="panierElem">$${obj.prix}</td>
                <td class="panierElem">${obj.quantite}</td>
                <td class="panierElem">$${total.toFixed(2)}</td>
            </tr>`
}
