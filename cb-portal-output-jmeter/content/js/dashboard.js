/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 88.88888888888889, "KoPercent": 11.11111111111111};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8865079365079365, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "load/api/user/common/get-captcha-116"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/building-2-BD5aCAm_.js-93"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/user-20e1sqhw.png-135"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/Footer-BAKcPuK9.js-87"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/CommonFunctions-CnWrkEnA.js-128"], "isController": false}, {"data": [1.0, 500, 1500, "login/fonts/inter/Inter-Bold.woff2-136"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/index-C0qVkeVA.js-91"], "isController": false}, {"data": [0.0, 500, 1500, "login/api/user/common/get-roles-137"], "isController": false}, {"data": [0.95, 500, 1500, "Get Request"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/DeptHod-DxCllyt1.js-119"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/eye-DGES70Tp.js-129"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/axiosInstance-iCbyfX82.js-132"], "isController": false}, {"data": [1.0, 500, 1500, "load/fonts/inter/Inter-SemiBold.woff2-100"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/index-DGqSwNHa.js-127"], "isController": false}, {"data": [0.0, 500, 1500, "login/api/user/verify-all-139"], "isController": false}, {"data": [1.0, 500, 1500, "load/fonts/inter/Inter-Medium.woff2-101"], "isController": false}, {"data": [0.0, 500, 1500, "login/api/cb-admin/tranning/get-traing/count-138"], "isController": false}, {"data": [1.0, 500, 1500, "load/api/trainee/trainning/get-published-trainings/common-107"], "isController": false}, {"data": [0.0, 500, 1500, "login/api/cb-admin/tranning/get-all-140"], "isController": false}, {"data": [1.0, 500, 1500, "Post-Request"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/KeyService-D1-fUBo5.js-94"], "isController": false}, {"data": [0.0, 500, 1500, "login/api/user/common/get-roles-141"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/ksitm-gLlbCp8M.jpeg-105"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/ksitm-gLlbCp8M.jpeg-104"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/Card1-ClhUoksI.js-123"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/book-open-D7oZv4uK.js-95"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/Profilepage-ZCz2LRXl.js-131"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/circle-x-Di9TDO3_.js-125"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/gok-CpOzofsE.js-122"], "isController": false}, {"data": [0.95, 500, 1500, "login/assets/AddCordinatorModal-C7lvIgJ4.js-124"], "isController": false}, {"data": [1.0, 500, 1500, "Post-Request-0"], "isController": false}, {"data": [1.0, 500, 1500, "Post-Request-1"], "isController": false}, {"data": [1.0, 500, 1500, "load/api/gust/capcity-building/datacount-108"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/ksitm-ChB1I-n5.js-90"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/Page404-Dr8llMeR.js-120"], "isController": false}, {"data": [1.0, 500, 1500, "load/-80"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/UserService-BfSzhVuF.js-112"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/save-Bt1NY0S9.js-126"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/index-X4jbpDKx.js-83"], "isController": false}, {"data": [1.0, 500, 1500, "logout/api/user/logout-142"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/Login-5xM-r83l.js-110"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/trainingcb-CMGlaQRj.png-117"], "isController": false}, {"data": [1.0, 500, 1500, "load/fonts/inter/Inter-Regular.woff2-85"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/LandingPage-vXmLK-Au.css-86"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/auth-C-RyjIE3.js-111"], "isController": false}, {"data": [1.0, 500, 1500, "Get Request-0"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/successTick-CR6fuTKj.js-97"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/send-B9exdayl.js-98"], "isController": false}, {"data": [0.95, 500, 1500, "Get Request-1"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/landingpage-dCYhEXVv.png-103"], "isController": false}, {"data": [0.0, 500, 1500, "login/api/user/depthod/verify-134"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/circle-check-big-BdGYvLK8.js-121"], "isController": false}, {"data": [1.0, 500, 1500, "logout/api/user/common/get-captcha-143"], "isController": false}, {"data": [0.0, 500, 1500, "login/api/user/common/login-118"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/LandingPage-Bh4rt6OC.js-88"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/x-ZOjGbARq.js-89"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/index-Dddu7pcZ.css-82"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/SuccessPopupCustom-pjhSuKBM.js-96"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/validation-hwamtf31.js-109"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/trash-2-BLv2adtP.js-130"], "isController": false}, {"data": [1.0, 500, 1500, "login/assets/user-tTzluKa1.js-133"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/landingpage-dCYhEXVv.png-106"], "isController": false}, {"data": [1.0, 500, 1500, "load/assets/participants-DvlpA39J.js-99"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 630, 70, 11.11111111111111, 73.75714285714287, 43, 964, 55.0, 106.89999999999998, 174.0, 315.58999999999935, 49.39626783754116, 1816.1333576721029, 21.667528324447233], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["load/api/user/common/get-captcha-116", 10, 0, 0.0, 72.0, 64, 88, 70.5, 87.0, 88.0, 88.0, 1.2627857052658165, 13.53696410531633, 0.649890690112388], "isController": false}, {"data": ["load/assets/building-2-BD5aCAm_.js-93", 10, 0, 0.0, 50.4, 45, 57, 49.5, 56.9, 57.0, 57.0, 1.2312238364934747, 2.060857085693179, 0.5230296571041615], "isController": false}, {"data": ["login/assets/user-20e1sqhw.png-135", 10, 0, 0.0, 53.1, 47, 61, 52.5, 60.7, 61.0, 61.0, 1.2904890953671442, 41.30825348432056, 0.647765034197961], "isController": false}, {"data": ["load/assets/Footer-BAKcPuK9.js-87", 10, 0, 0.0, 54.8, 46, 81, 52.0, 79.30000000000001, 81.0, 81.0, 1.2324377618930245, 6.564175345082573, 0.5187311282967709], "isController": false}, {"data": ["login/assets/CommonFunctions-CnWrkEnA.js-128", 10, 0, 0.0, 54.0, 50, 59, 53.0, 58.9, 59.0, 59.0, 1.2853470437017993, 25.464683081619537, 0.5686154402313625], "isController": false}, {"data": ["login/fonts/inter/Inter-Bold.woff2-136", 10, 0, 0.0, 57.0, 52, 66, 55.5, 65.7, 66.0, 66.0, 1.2913223140495869, 146.40745052621384, 0.6179179041838844], "isController": false}, {"data": ["load/assets/index-C0qVkeVA.js-91", 10, 0, 0.0, 58.4, 51, 72, 55.0, 71.8, 72.0, 72.0, 1.2301636117603643, 45.31302858592693, 0.5165726104071842], "isController": false}, {"data": ["login/api/user/common/get-roles-137", 10, 10, 100.0, 51.400000000000006, 46, 61, 50.0, 60.5, 61.0, 61.0, 1.2901561088891758, 0.7458715004515546, 0.5770424783898852], "isController": false}, {"data": ["Get Request", 10, 0, 0.0, 337.3, 244, 964, 266.5, 899.5000000000002, 964.0, 964.0, 1.1055831951354338, 4.315445342730791, 0.33469803758982863], "isController": false}, {"data": ["login/assets/DeptHod-DxCllyt1.js-119", 10, 0, 0.0, 51.5, 46, 56, 51.5, 56.0, 56.0, 56.0, 1.2721027859051013, 54.58116015774075, 0.5528181052029004], "isController": false}, {"data": ["login/assets/eye-DGES70Tp.js-129", 10, 0, 0.0, 53.6, 47, 67, 53.5, 66.0, 67.0, 67.0, 1.283532280836863, 1.9115104768322422, 0.5527712264150944], "isController": false}, {"data": ["login/assets/axiosInstance-iCbyfX82.js-132", 10, 0, 0.0, 53.9, 47, 63, 52.0, 62.7, 63.0, 63.0, 1.2874983906270117, 2.217917149478563, 0.5670525138406076], "isController": false}, {"data": ["load/fonts/inter/Inter-SemiBold.woff2-100", 10, 0, 0.0, 58.19999999999999, 48, 79, 57.0, 77.10000000000001, 79.0, 79.0, 1.2312238364934747, 139.55994328675203, 0.5939693117458754], "isController": false}, {"data": ["login/assets/index-DGqSwNHa.js-127", 10, 0, 0.0, 52.49999999999999, 48, 61, 51.5, 60.7, 61.0, 61.0, 1.2828736369467606, 2.758679441949968, 0.5549931847338038], "isController": false}, {"data": ["login/api/user/verify-all-139", 10, 10, 100.0, 49.6, 44, 57, 49.5, 56.6, 57.0, 57.0, 1.2939958592132506, 0.7480913561076605, 0.5711778597308489], "isController": false}, {"data": ["load/fonts/inter/Inter-Medium.woff2-101", 10, 0, 0.0, 58.199999999999996, 51, 75, 56.5, 73.7, 75.0, 75.0, 1.2319822594554637, 139.0876690125662, 0.5919289762227423], "isController": false}, {"data": ["login/api/cb-admin/tranning/get-traing/count-138", 10, 10, 100.0, 50.0, 45, 59, 49.5, 58.5, 59.0, 59.0, 1.2924906294429364, 0.7472211451466977, 0.5944952016285382], "isController": false}, {"data": ["load/api/trainee/trainning/get-published-trainings/common-107", 10, 0, 0.0, 92.2, 82, 105, 94.0, 104.8, 105.0, 105.0, 1.2402331638348008, 3.80184755984125, 0.5716699739551035], "isController": false}, {"data": ["login/api/cb-admin/tranning/get-all-140", 10, 10, 100.0, 53.0, 46, 62, 53.0, 61.8, 62.0, 62.0, 1.2891581797086502, 0.7452945726440635, 0.5816319131107387], "isController": false}, {"data": ["Post-Request", 10, 0, 0.0, 108.0, 97, 128, 106.0, 127.3, 128.0, 128.0, 1.2241400416207613, 4.778210689802913, 0.469811558942343], "isController": false}, {"data": ["load/assets/KeyService-D1-fUBo5.js-94", 10, 0, 0.0, 52.800000000000004, 45, 63, 53.5, 62.400000000000006, 63.0, 63.0, 1.2310722639418934, 8.070496199064385, 0.5229652683737536], "isController": false}, {"data": ["login/api/user/common/get-roles-141", 10, 10, 100.0, 52.7, 48, 59, 52.0, 58.9, 59.0, 59.0, 1.2891581797086502, 0.7452945726440635, 0.5765961389712518], "isController": false}, {"data": ["load/assets/ksitm-gLlbCp8M.jpeg-105", 10, 0, 0.0, 95.60000000000001, 49, 455, 54.5, 417.10000000000014, 455.0, 455.0, 1.2416190712689348, 9.795937965607152, 0.6098968680158927], "isController": false}, {"data": ["load/assets/ksitm-gLlbCp8M.jpeg-104", 10, 0, 0.0, 56.099999999999994, 49, 67, 55.5, 66.9, 67.0, 67.0, 1.235788433020267, 9.749936279658922, 0.6070327947355413], "isController": false}, {"data": ["login/assets/Card1-ClhUoksI.js-123", 10, 0, 0.0, 55.300000000000004, 49, 63, 55.5, 62.9, 63.0, 63.0, 1.2737230925996688, 41.89852407336645, 0.5510345019742708], "isController": false}, {"data": ["load/assets/book-open-D7oZv4uK.js-95", 10, 0, 0.0, 51.2, 47, 57, 51.0, 56.8, 57.0, 57.0, 1.231678778174652, 1.8691687707845794, 0.5220201071560537], "isController": false}, {"data": ["login/assets/Profilepage-ZCz2LRXl.js-131", 10, 0, 0.0, 55.30000000000001, 51, 64, 54.0, 63.6, 64.0, 64.0, 1.2853470437017993, 106.18046071658097, 0.5635945533419023], "isController": false}, {"data": ["login/assets/circle-x-Di9TDO3_.js-125", 10, 0, 0.0, 57.2, 44, 100, 51.5, 96.80000000000001, 100.0, 100.0, 1.2745347947998982, 2.0985016250318633, 0.5551196469538618], "isController": false}, {"data": ["login/assets/gok-CpOzofsE.js-122", 10, 0, 0.0, 52.8, 49, 59, 52.0, 58.8, 59.0, 59.0, 1.2733987011333248, 2.433634041130778, 0.548407057812301], "isController": false}, {"data": ["login/assets/AddCordinatorModal-C7lvIgJ4.js-124", 10, 0, 0.0, 121.10000000000001, 50, 639, 62.0, 583.1000000000001, 639.0, 639.0, 1.2712941774726674, 138.48540196732773, 0.5661231884057971], "isController": false}, {"data": ["Post-Request-0", 10, 0, 0.0, 51.9, 46, 62, 50.0, 61.9, 62.0, 62.0, 1.232134056185313, 1.145499630359783, 0.28637490758994577], "isController": false}, {"data": ["Post-Request-1", 10, 0, 0.0, 55.8, 50, 66, 54.0, 65.8, 66.0, 66.0, 1.2313754463735993, 3.6616584318433687, 0.1863898380741288], "isController": false}, {"data": ["load/api/gust/capcity-building/datacount-108", 10, 0, 0.0, 103.30000000000001, 93, 117, 102.0, 116.5, 117.0, 117.0, 1.241927471435668, 1.5536221590909092, 0.5518330073273721], "isController": false}, {"data": ["load/assets/ksitm-ChB1I-n5.js-90", 10, 0, 0.0, 54.7, 47, 77, 53.0, 75.10000000000001, 77.0, 77.0, 1.2306177701206005, 1.6223964742800887, 0.5167633214373616], "isController": false}, {"data": ["login/assets/Page404-Dr8llMeR.js-120", 10, 0, 0.0, 53.599999999999994, 48, 59, 54.0, 58.8, 59.0, 59.0, 1.2721027859051013, 2.8237203441038035, 0.5528181052029004], "isController": false}, {"data": ["load/-80", 10, 0, 0.0, 55.300000000000004, 46, 79, 53.0, 77.4, 79.0, 79.0, 1.2319822594554637, 2.3508723974374766, 0.5798978994702476], "isController": false}, {"data": ["load/assets/UserService-BfSzhVuF.js-112", 10, 0, 0.0, 54.599999999999994, 49, 63, 54.5, 62.9, 63.0, 63.0, 1.2594458438287153, 1.9875629722921913, 0.542398063602015], "isController": false}, {"data": ["login/assets/save-Bt1NY0S9.js-126", 10, 0, 0.0, 56.0, 49, 88, 52.0, 85.00000000000001, 88.0, 88.0, 1.2768130745658834, 1.9975142045454546, 0.5511243935137896], "isController": false}, {"data": ["load/assets/index-X4jbpDKx.js-83", 10, 0, 0.0, 198.10000000000002, 179, 216, 195.0, 216.0, 216.0, 216.0, 1.209921355111918, 205.969024122807, 0.4903489866908651], "isController": false}, {"data": ["logout/api/user/logout-142", 10, 0, 0.0, 186.9, 166, 308, 173.5, 296.30000000000007, 308.0, 308.0, 1.2675877804537963, 2.038538629737609, 0.5731378343262771], "isController": false}, {"data": ["load/assets/Login-5xM-r83l.js-110", 10, 0, 0.0, 55.5, 43, 81, 54.0, 79.30000000000001, 81.0, 81.0, 1.2518778167250877, 14.601981096644966, 0.5318035647220831], "isController": false}, {"data": ["load/assets/trainingcb-CMGlaQRj.png-117", 10, 0, 0.0, 97.8, 61, 144, 105.0, 141.3, 144.0, 144.0, 1.2600806451612903, 566.6400540259576, 0.6300403225806451], "isController": false}, {"data": ["load/fonts/inter/Inter-Regular.woff2-85", 10, 0, 0.0, 60.4, 53, 73, 59.5, 72.0, 73.0, 73.0, 1.2312238364934747, 135.2987545401379, 0.5927669447180498], "isController": false}, {"data": ["load/assets/LandingPage-vXmLK-Au.css-86", 10, 0, 0.0, 83.3, 46, 349, 53.5, 320.9000000000001, 349.0, 349.0, 1.2330456226880395, 2.1349510635018496, 0.5430698982737362], "isController": false}, {"data": ["load/assets/auth-C-RyjIE3.js-111", 10, 0, 0.0, 54.6, 45, 78, 51.5, 76.0, 78.0, 78.0, 1.2615112905260502, 4.649358994575501, 0.5346639649299861], "isController": false}, {"data": ["Get Request-0", 10, 0, 0.0, 108.5, 90, 184, 99.5, 177.70000000000002, 184.0, 184.0, 1.126506702714881, 1.047299200180241, 0.17051615128985015], "isController": false}, {"data": ["load/assets/successTick-CR6fuTKj.js-97", 10, 0, 0.0, 51.4, 46, 63, 51.5, 62.1, 63.0, 63.0, 1.2310722639418934, 1.6229956604702698, 0.5241674873815093], "isController": false}, {"data": ["load/assets/send-B9exdayl.js-98", 10, 0, 0.0, 54.2, 46, 63, 54.0, 62.400000000000006, 63.0, 63.0, 1.2304663467454167, 1.8805467115786882, 0.5154981081579918], "isController": false}, {"data": ["Get Request-1", 10, 0, 0.0, 227.4, 150, 778, 166.0, 719.9000000000002, 778.0, 778.0, 1.1287955751213454, 3.356623560785642, 0.17086261146856305], "isController": false}, {"data": ["load/assets/landingpage-dCYhEXVv.png-103", 10, 0, 0.0, 108.5, 97, 134, 106.0, 132.20000000000002, 134.0, 134.0, 1.2315270935960592, 369.1213823891626, 0.61095289408867], "isController": false}, {"data": ["login/api/user/depthod/verify-134", 10, 10, 100.0, 52.099999999999994, 49, 57, 51.5, 56.9, 57.0, 57.0, 1.2901561088891758, 0.7458715004515546, 0.574522642239711], "isController": false}, {"data": ["login/assets/circle-check-big-BdGYvLK8.js-121", 10, 0, 0.0, 54.5, 50, 60, 54.0, 59.9, 60.0, 60.0, 1.2745347947998982, 1.8209418015549323, 0.565076950038236], "isController": false}, {"data": ["logout/api/user/common/get-captcha-143", 10, 0, 0.0, 72.10000000000001, 65, 77, 74.0, 76.8, 77.0, 77.0, 1.2827090815802975, 12.95310696190354, 0.6601442246023601], "isController": false}, {"data": ["login/api/user/common/login-118", 10, 10, 100.0, 62.199999999999996, 56, 67, 62.5, 66.9, 67.0, 67.0, 1.269196598553116, 0.7300359341286966, 1.528241607437492], "isController": false}, {"data": ["load/assets/LandingPage-Bh4rt6OC.js-88", 10, 0, 0.0, 57.7, 49, 81, 53.5, 80.4, 81.0, 81.0, 1.231830500123183, 31.676328837152006, 0.524490330130574], "isController": false}, {"data": ["load/assets/x-ZOjGbARq.js-89", 10, 0, 0.0, 51.4, 44, 61, 52.0, 60.400000000000006, 61.0, 61.0, 1.2313754463735993, 1.7171915404506832, 0.5122714259327669], "isController": false}, {"data": ["load/assets/index-Dddu7pcZ.css-82", 10, 0, 0.0, 58.9, 54, 71, 57.0, 70.5, 71.0, 71.0, 1.2306177701206005, 169.7459351156781, 0.5347899489293626], "isController": false}, {"data": ["load/assets/SuccessPopupCustom-pjhSuKBM.js-96", 10, 0, 0.0, 53.6, 48, 60, 54.0, 59.7, 60.0, 60.0, 1.2310722639418934, 3.1774648374984613, 0.5325830204357996], "isController": false}, {"data": ["load/assets/validation-hwamtf31.js-109", 10, 0, 0.0, 56.8, 48, 77, 53.5, 76.3, 77.0, 77.0, 1.2565971349585323, 2.202726423096255, 0.5399440814274943], "isController": false}, {"data": ["login/assets/trash-2-BLv2adtP.js-130", 10, 0, 0.0, 52.70000000000001, 48, 61, 52.5, 60.400000000000006, 61.0, 61.0, 1.2850167052171677, 2.143367707530198, 0.558430111153945], "isController": false}, {"data": ["login/assets/user-tTzluKa1.js-133", 10, 0, 0.0, 54.10000000000001, 47, 63, 52.5, 62.9, 63.0, 63.0, 1.2883277505797477, 1.8431642134759083, 0.5560945954650863], "isController": false}, {"data": ["load/assets/landingpage-dCYhEXVv.png-106", 10, 0, 0.0, 73.6, 54, 107, 68.5, 105.9, 107.0, 107.0, 1.2433171702101207, 372.6551815243069, 0.6168018774089271], "isController": false}, {"data": ["load/assets/participants-DvlpA39J.js-99", 10, 0, 0.0, 56.0, 49, 65, 54.5, 64.9, 65.0, 65.0, 1.231830500123183, 3.4681321600147816, 0.5256932896033506], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 10, 14.285714285714286, 1.5873015873015872], "isController": false}, {"data": ["401/Unauthorized", 60, 85.71428571428571, 9.523809523809524], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 630, 70, "401/Unauthorized", 60, "400/Bad Request", 10, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["login/api/user/common/get-roles-137", 10, 10, "401/Unauthorized", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["login/api/user/verify-all-139", 10, 10, "401/Unauthorized", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["login/api/cb-admin/tranning/get-traing/count-138", 10, 10, "401/Unauthorized", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["login/api/cb-admin/tranning/get-all-140", 10, 10, "401/Unauthorized", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["login/api/user/common/get-roles-141", 10, 10, "401/Unauthorized", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["login/api/user/depthod/verify-134", 10, 10, "401/Unauthorized", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["login/api/user/common/login-118", 10, 10, "400/Bad Request", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
