const limit = 250;
let page = 1;
let NoDeals = 0
var Id_user = ""
function GetDeals() {
    $.ajax({
        url: '/api/v4/contacts',
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function(data) {
        if (!!data) {
            for(var k in data['_embedded']['contacts']) {
                if(data['_embedded']['contacts'][k]['_embedded']['leads'].length == 0)
                {
                    NoDeals++
                    Id_user += data['_embedded']['contacts'][k]['id'] + "\n"
                   
                }
            }
            console.log("Количество пользователей без заказа: "+NoDeals+", список ID: "+ Id_user)

        } else {
            console.log('Контактов нет');
            return false;
        }
    }).fail(function(data) {
        console.log('Что-то пошло не так c получением контактов');
        console.log(data);
        return false;
    })

    page++;
}
GetDeals();