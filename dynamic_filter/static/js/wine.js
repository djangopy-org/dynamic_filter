var send_data = {}

$(document).ready(function () {
    resetFilters();
    getAPIData();
    getCountries();
    getvariety();

    $('#countries').on('change', function () {
        $("#province").val("all");
        $("#region").val("all");
        send_data['province'] = '';
        send_data['region'] = '';

        if(this.value == "all")
            send_data['country'] = "";
        else{
            send_data['country'] = this.value;
            getProvince(this.value);
        }
        getAPIData();
    });

    $('#variety').on('change', function () {
        if(this.value == "all")
            send_data['variety'] = "";
        else
            send_data['variety'] = this.value;
        getAPIData();
    });

    $('#province').on('change', function () {
        send_data['region'] = "";
        $('#region').val("all");
        if(this.value == "all")
            send_data['province'] = "";
        else
            send_data['province'] = this.value;
        getRegion(this.value);
        getAPIData();
    });

    $('#region').on('change', function () {
        if(this.value == "all")
            send_data['region'] = "";
        else
            send_data['region'] = this.value;
        getAPIData();
    });

    $('#sort_by').on('change', function () {
        send_data['sort_by'] = this.value;
        getAPIData();
    });

    $("#display_all").click(function(){
        resetFilters();
        getAPIData();
    })
})

function resetFilters() {
    $("#countries").val("all");
    $("#province").val("all");
    $("#region").val("all");
    $("#variety").val("all");
    $("#sort_by").val("none");

    getProvince("all");
    getRegion("all");

    send_data['country'] = '';
    send_data['province'] = '';
    send_data['region'] = '';
    send_data['variety'] = '';
    send_data["sort_by"] = '',
    send_data['format'] = 'json';
}

function putTableData(result) {
    let table_content = "";
    if(result["results"].length > 0){
        $("#no_results").hide();
        $("#list_data").show();
        $.each(result["results"], function (a, b) {
            table_content += "<tr> <td>" + b.country + "</td>" +
            "<td>" + b.taster_name + "</td>" +
            "<td title=\"" + b.title + "\">" + b.title.slice(0, 50) + "..." + "</td>" +
                "<td title=\"" + b.description + "\">" + b.description.slice(0, 60) + "..." + "</td>" +
                "<td>" + b.designation + "</td>" +
                "<td>" + b.points + "</td>" +
                "<td>" + b.price + "</td>" +
                "<td>" + b.province + "</td>" +
                "<td>" + b.region + "</td>" +
                "<td>" + b.winery + "</td>" +
                "<td>" + b.variety + "</td></tr>"
        });
        $("#listing").html(table_content);     
    }
    else{
        $("#no_results h5").html("No results found");
        $("#list_data").hide();
        $("#no_results").show();
    }

    prev_url = result["previous"];
    next_url = result["next"];

    if (prev_url === null) {
        $("#previous").addClass("disabled");
        $("#previous").prop('disabled', true);
    } else {
        $("#previous").removeClass("disabled");
        $("#previous").prop('disabled', false);
    }
    if (next_url === null) {
        $("#next").addClass("disabled");
        $("#next").prop('disabled', true);
    } else {
        $("#next").removeClass("disabled");
        $("#next").prop('disabled', false);
    }
    $("#previous").attr("url", result["previous"]);
    $("#next").attr("url", result["next"]);
}

function getAPIData() {
    let url = $('#list_data').attr("url")
    $.ajax({
        method: 'GET',
        url: url,
        data: send_data,
        beforeSend: function(){
            $("#no_results h5").html("No data to show");
        },
        success: function (result) {
            putTableData(result);
        },
        error: function (response) {
            $("#no_results h5").html("Something went wrong");
            $("#list_data").hide();
        }
    });
}

$("#next").click(function () {
    let url = $(this).attr("url");
    if (!url)
        $(this).prop('all', true);

    $(this).prop('all', false);
    $.ajax({
        method: 'GET',
        url: url,
        success: function (result) {
            putTableData(result);
        },
        error: function(response){
            console.log(response)
        }
    });
})

$("#previous").click(function () {
    let url = $(this).attr("url");
    if (!url)
        $(this).prop('all', true);

    $(this).prop('all', false);
    $.ajax({
        method: 'GET',
        url: url,
        success: function (result) {
            putTableData(result);
        },
        error: function(response){
            console.log(response)
        }
    });
})

function getCountries() {
    let url = $("#countries").attr("url");
    $.ajax({
        method: 'GET',
        url: url,
        data: {},
        success: function (result) {
            countries_option = "<option value='all' selected>All Countries</option>";
            $.each(result["countries"], function (a, b) {
                countries_option += "<option>" + b + "</option>"
            });
            $("#countries").html(countries_option)
        },
        error: function(response){
            console.log(response)
        }
    });
}

function getvariety() {
    let url = $("#variety").attr("url");
    $.ajax({
        method: 'GET',
        url: url,
        data: {},
        success: function (result) {
            winery_options = "<option value='all' selected>All Varieties</option>";
            $.each(result["variety"], function (a, b) {
                winery_options += "<option>" + b + "</option>"
            });
            $("#variety").html(winery_options)
        },
        error: function(response){
            console.log(response)
        }
    });
}

function getProvince(country) {
    let url = $("#province").attr("url");
    let province_option = "<option value='all' selected>All Provinces</option>";
    $.ajax({
        method: 'GET',
        url: url,
        data: {
            "country": country
        },
        success: function (result) {
            $.each(result["province"], function (a, b) {
                province_option += "<option>" + b + "</option>"
            });
            $("#province").html(province_option)
        },
        error: function(response){
            console.log(response)
        }
    });
}

function getRegion(province) {
    let url = $("#region").attr("url");
    let region_option = "<option value='all' selected>All regions</option>";
    $.ajax({
        method: 'GET',
        url: url,
        data: {
            "province": province
        },
        success: function (response) {
            $.each(response["region"], function (a, b) {
                region_option += "<option>" + b + "</option>"
            });
            $("#region").html(region_option);
        },
        error: function(response){
            console.log(response)
        }
    });
}

