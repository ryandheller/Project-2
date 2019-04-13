
graphdata = []
window.onload = function () {

    d3.json('/nyt/titlesort', function (error, json) {
        // console.log(json['data'].slice(0, 5))
        let tempData = json['data'].slice(0, 5)
        if (error) throw error;
        graphdata.push(json)

        // console.log(graphdata[0])
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
            data: tempData
        });
        chart.render();
    }) // end d3json


    function toogleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
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