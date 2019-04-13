
d3.json('nyt/ranksort',function(data){
  var list = [];
for (var i = 1; i <= 15; i++) {
    list.push(i);

}

master_list = []
master_list1 = []
master_list2 = []
master_list3 = []

list.forEach(function(num){
  in_list = []
  in_list1 = []
  in_list2 = []
  in_list3 = []
  data.forEach(function(d){
    if (d.rank == num ){
      in_list.push({'price':+d.Hardcover, 'type':'Hardcover'})
      in_list1.push({'price':+d.Kindle, 'type':'Kindle'})
      in_list2.push({'price':+d.Paperback, 'type':'Paperback'})
      in_list3.push({'price':+d.Audio, 'type':'Audio'})
    }
  })
master_list.push(in_list)
master_list1.push(in_list1)
master_list2.push(in_list2)
master_list3.push(in_list3)
})
final_list = []
final_list.push(master_list)
final_list.push(master_list1)
final_list.push(master_list2)
final_list.push(master_list3)
// console.log(final_list)
plotting_data = []
final_list.forEach(function(list){
  data_for_plot = []
  gum = 0
  list.forEach(function(rank){
    gum +=1
    who_dis = []
    rank.forEach(function(f){
      who_dis.push(f.price)
      type = f.type
    })
    sum = who_dis.reduce(add)
    function add(accumulator, a) {
      return accumulator + a;
  }

  data_for_plot.push({'mean':sum/rank.length,'rank':gum, 'type':type})
})
  plotting_data.push(data_for_plot)
})
// console.log(plotting_data)
 
tracers = []
all_means = []
 plotting_data.forEach(function(list){
  ranks = []
  means = []
  //  console.log(list)
   list.forEach(function(d){
    // console.log(d)
   rank = d.rank
   ranks.push(rank)
   mean= d.mean
   means.push(mean)
   type = d.type
   })
   all_means.push(means)
   trace = {
    x: ranks,
    y: means,
    mode: 'markers',
    name: type
  };
  // console.log(trace)
  tracers.push(trace)
  })
  // console.log(tracers)
      var layout = {
        autosize: false,
        width: 960,
        height: 500,
        title: 'Average Book Price by Rank',
        xaxis: {
          title: 'Rank',
          range: [0,16],
          tickvals: list

        },
        yaxis: {
          title: 'Average Price($)',
          range:[0,Math.max(...all_means)]
        }
      }
      
      Plotly.plot('pie', tracers,layout);
    
    })

    
    