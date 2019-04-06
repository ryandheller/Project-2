
window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Eight Year Chart Performance"
        },
        axisX: {
            valueFormatString: "MMM YYYY"
        },
        axisY2: {
            title: "Top Chart Placement",
            prefix: "$",
            suffix: "K"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type:"line",
            axisYType: "secondary",
            name: "San Fransisco",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "$#,###k",
            dataPoints: [		
                { x: new Date(2014, 00, 01), y: 850 },
                { x: new Date(2014, 01, 01), y: 889 },
                { x: new Date(2014, 02, 01), y: 890 },
                { x: new Date(2014, 03, 01), y: 899 },
                { x: new Date(2014, 04, 01), y: 903 },
                { x: new Date(2014, 05, 01), y: 925 },
                { x: new Date(2014, 06, 01), y: 899 },
                { x: new Date(2014, 07, 01), y: 875 },
                { x: new Date(2014, 08, 01), y: 927 },
                { x: new Date(2014, 09, 01), y: 949 },
                { x: new Date(2014, 10, 01), y: 946 },
                { x: new Date(2014, 11, 01), y: 927 },
                { x: new Date(2015, 00, 01), y: 950 },
                { x: new Date(2015, 01, 01), y: 998 },
                { x: new Date(2015, 02, 01), y: 998 },
                { x: new Date(2015, 03, 01), y: 1050 },
                { x: new Date(2015, 04, 01), y: 1050 },
                { x: new Date(2015, 05, 01), y: 999 },
                { x: new Date(2015, 06, 01), y: 998 },
                { x: new Date(2015, 07, 01), y: 998 },
                { x: new Date(2015, 08, 01), y: 1050 },
                { x: new Date(2015, 09, 01), y: 1070 },
                { x: new Date(2015, 10, 01), y: 1050 },
                { x: new Date(2015, 11, 01), y: 1050 },
                { x: new Date(2016, 00, 01), y: 995 },
                { x: new Date(2016, 01, 01), y: 1090 },
                { x: new Date(2016, 02, 01), y: 1100 },
                { x: new Date(2016, 03, 01), y: 1150 },
                { x: new Date(2016, 04, 01), y: 1150 },
                { x: new Date(2016, 05, 01), y: 1150 },
                { x: new Date(2016, 06, 01), y: 1100 },
                { x: new Date(2016, 07, 01), y: 1100 },
                { x: new Date(2016, 08, 01), y: 1150 },
                { x: new Date(2016, 09, 01), y: 1170 },
                { x: new Date(2016, 10, 01), y: 1150 },
                { x: new Date(2016, 11, 01), y: 1150 },
                { x: new Date(2017, 00, 01), y: 1150 },
                { x: new Date(2017, 01, 01), y: 1200 },
                { x: new Date(2017, 02, 01), y: 1200 },
                { x: new Date(2017, 03, 01), y: 1200 },
                { x: new Date(2017, 04, 01), y: 1190 },
                { x: new Date(2017, 05, 01), y: 1170 }
            ]
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Manhattan",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "$#,###k",
            dataPoints: [
                { x: new Date(2014, 00, 01), y: 1200 },
                { x: new Date(2014, 01, 01), y: 1200 },
                { x: new Date(2014, 02, 01), y: 1190 },
                { x: new Date(2014, 03, 01), y: 1180 },
                { x: new Date(2014, 04, 01), y: 1250 },
                { x: new Date(2014, 05, 01), y: 1270 },
                { x: new Date(2014, 06, 01), y: 1300 },
                { x: new Date(2014, 07, 01), y: 1300 },
                { x: new Date(2014, 08, 01), y: 1358 },
                { x: new Date(2014, 09, 01), y: 1410 },
                { x: new Date(2014, 10, 01), y: 1480 },
                { x: new Date(2014, 11, 01), y: 1500 },
                { x: new Date(2015, 00, 01), y: 1500 },
                { x: new Date(2015, 01, 01), y: 1550 },
                { x: new Date(2015, 02, 01), y: 1550 },
                { x: new Date(2015, 03, 01), y: 1590 },
                { x: new Date(2015, 04, 01), y: 1600 },
                { x: new Date(2015, 05, 01), y: 1590 },
                { x: new Date(2015, 06, 01), y: 1590 },
                { x: new Date(2015, 07, 01), y: 1620 },
                { x: new Date(2015, 08, 01), y: 1670 },
                { x: new Date(2015, 09, 01), y: 1720 },
                { x: new Date(2015, 10, 01), y: 1750 },
                { x: new Date(2015, 11, 01), y: 1820 },
                { x: new Date(2016, 00, 01), y: 2000 },
                { x: new Date(2016, 01, 01), y: 1920 },
                { x: new Date(2016, 02, 01), y: 1750 },
                { x: new Date(2016, 03, 01), y: 1850 },
                { x: new Date(2016, 04, 01), y: 1750 },
                { x: new Date(2016, 05, 01), y: 1730 },
                { x: new Date(2016, 06, 01), y: 1700 },
                { x: new Date(2016, 07, 01), y: 1730 },
                { x: new Date(2016, 08, 01), y: 1720 },
                { x: new Date(2016, 09, 01), y: 1740 },
                { x: new Date(2016, 10, 01), y: 1750 },
                { x: new Date(2016, 11, 01), y: 1750 },
                { x: new Date(2017, 00, 01), y: 1750 },
                { x: new Date(2017, 01, 01), y: 1770 },
                { x: new Date(2017, 02, 01), y: 1750 },
                { x: new Date(2017, 03, 01), y: 1750 },
                { x: new Date(2017, 04, 01), y: 1730 },
                { x: new Date(2017, 05, 01), y: 1730 }
            ]
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Seatle",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "$#,###k",
            dataPoints: [
                { x: new Date(2014, 00, 01), y: 409 },
                { x: new Date(2014, 01, 01), y: 415 },
                { x: new Date(2014, 02, 01), y: 419 },
                { x: new Date(2014, 03, 01), y: 429 },
                { x: new Date(2014, 04, 01), y: 429 },
                { x: new Date(2014, 05, 01), y: 450 },
                { x: new Date(2014, 06, 01), y: 450 },
                { x: new Date(2014, 07, 01), y: 445 },
                { x: new Date(2014, 08, 01), y: 450 },
                { x: new Date(2014, 09, 01), y: 450 },
                { x: new Date(2014, 10, 01), y: 440 },
                { x: new Date(2014, 11, 01), y: 429 },
                { x: new Date(2015, 00, 01), y: 435 },
                { x: new Date(2015, 01, 01), y: 450 },
                { x: new Date(2015, 02, 01), y: 475 },
                { x: new Date(2015, 03, 01), y: 475 },
                { x: new Date(2015, 04, 01), y: 475 },
                { x: new Date(2015, 05, 01), y: 489 },
                { x: new Date(2015, 06, 01), y: 495 },
                { x: new Date(2015, 07, 01), y: 495 },
                { x: new Date(2015, 08, 01), y: 500 },
                { x: new Date(2015, 09, 01), y: 508 },
                { x: new Date(2015, 10, 01), y: 520 },
                { x: new Date(2015, 11, 01), y: 525 },
                { x: new Date(2016, 00, 01), y: 525 },
                { x: new Date(2016, 01, 01), y: 529 },
                { x: new Date(2016, 02, 01), y: 549 },
                { x: new Date(2016, 03, 01), y: 550 },
                { x: new Date(2016, 04, 01), y: 568 },
                { x: new Date(2016, 05, 01), y: 575 },
                { x: new Date(2016, 06, 01), y: 579 },
                { x: new Date(2016, 07, 01), y: 575 },
                { x: new Date(2016, 08, 01), y: 585 },
                { x: new Date(2016, 09, 01), y: 589 },
                { x: new Date(2016, 10, 01), y: 595 },
                { x: new Date(2016, 11, 01), y: 595 },
                { x: new Date(2017, 00, 01), y: 595 },
                { x: new Date(2017, 01, 01), y: 600 },
                { x: new Date(2017, 02, 01), y: 624 },
                { x: new Date(2017, 03, 01), y: 635 },
                { x: new Date(2017, 04, 01), y: 650 },
                { x: new Date(2017, 05, 01), y: 675 }
            ]
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Los Angeles",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "$#,###k",
            dataPoints: [
                { x: new Date(2014, 00, 01), y: 529 },
                { x: new Date(2014, 01, 01), y: 540 },
                { x: new Date(2014, 02, 01), y: 539 },
                { x: new Date(2014, 03, 01), y: 565 },
                { x: new Date(2014, 04, 01), y: 575 },
                { x: new Date(2014, 05, 01), y: 579 },
                { x: new Date(2014, 06, 01), y: 589 },
                { x: new Date(2014, 07, 01), y: 579 },
                { x: new Date(2014, 08, 01), y: 579 },
                { x: new Date(2014, 09, 01), y: 579 },
                { x: new Date(2014, 10, 01), y: 569 },
                { x: new Date(2014, 11, 01), y: 525 },
                { x: new Date(2015, 00, 01), y: 535 },
                { x: new Date(2015, 01, 01), y: 575 },
                { x: new Date(2015, 02, 01), y: 599 },
                { x: new Date(2015, 03, 01), y: 619 },
                { x: new Date(2015, 04, 01), y: 639 },
                { x: new Date(2015, 05, 01), y: 648 },
                { x: new Date(2015, 06, 01), y: 640 },
                { x: new Date(2015, 07, 01), y: 645 },
                { x: new Date(2015, 08, 01), y: 648 },
                { x: new Date(2015, 09, 01), y: 649 },
                { x: new Date(2015, 10, 01), y: 649 },
                { x: new Date(2015, 11, 01), y: 649 },
                { x: new Date(2016, 00, 01), y: 650 },
                { x: new Date(2016, 01, 01), y: 665 },
                { x: new Date(2016, 02, 01), y: 675 },
                { x: new Date(2016, 03, 01), y: 695 },
                { x: new Date(2016, 04, 01), y: 690 },
                { x: new Date(2016, 05, 01), y: 699 },
                { x: new Date(2016, 06, 01), y: 699 },
                { x: new Date(2016, 07, 01), y: 699 },
                { x: new Date(2016, 08, 01), y: 699 },
                { x: new Date(2016, 09, 01), y: 699 },
                { x: new Date(2016, 10, 01), y: 709 },
                { x: new Date(2016, 11, 01), y: 699 },
                { x: new Date(2017, 00, 01), y: 700 },
                { x: new Date(2017, 01, 01), y: 700 },
                { x: new Date(2017, 02, 01), y: 724 },
                { x: new Date(2017, 03, 01), y: 739 },
                { x: new Date(2017, 04, 01), y: 749 },
                { x: new Date(2017, 05, 01), y: 740 }
            ]
        }]
    });
    chart.render();
    
    function toogleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
    }
    
// new Chart(ctx).Line(data, {
//     onAnimationComplete: function () {
//         var sourceCanvas = this.chart.ctx.canvas;
//         // the -5 is so that we don't copy the edges of the line
//         var copyWidth = this.scale.xScalePaddingLeft - 5;
//         // the +5 is so that the bottommost y axis label is not clipped off
//         // we could factor this in using measureText if we wanted to be generic
//         var copyHeight = this.scale.endPoint + 5;
//         var targetCtx = document.getElementById("myChartAxis").getContext("2d");
//         targetCtx.canvas.width = copyWidth;
//         targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
//     }
// });

// window.onload = function () {

//     var chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,
//         theme: "light2",
//         title:{
//             text: "Simple Line Chart"
//         },
//         axisY:{
//             includeZero: false
//         },
//         data: [{        
//             type: "line",       
//             dataPoints: [
//                 { y: 450 },
//                 { y: 414},
//                 { y: 520, indexLabel: "highest",markerColor: "red", markerType: "triangle" },
//                 { y: 460 },
//                 { y: 450 },
//                 { y: 500 },
//                 { y: 480 },
//                 { y: 480 },
//                 { y: 410 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
//                 { y: 500 },
//                 { y: 480 },
//                 { y: 510 }
//             ]
//         }]
//     });
//     chart.render();
    
//     }