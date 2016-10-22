function myFunction(){
  
var input=document.getElementById('mainContainer').value;
var lines=input.split('\n');
var line,weighingArray={},pwCount,pageWords,query,queryWeighingArray={},qwCount,queryObj=[],pageObj=[],pageStrength,pageNumber,queryResult={}, queryMainResult=[],outputString='';

//assigning weights to the page keywords and query keywords, taking N=8
  for(var i=0;i<lines.length-1;i++){
        line=lines[i];
        if(line[0]=='P' || line[0]=='p'){
            weighingArray={};
            pwCount=8;
            pageWords=line.split(' ');
            pageWords.forEach(function(d){
            if(d!='P' && d!='p' && d){
                  if(!weighingArray[d]){
                        weighingArray[d]=pwCount;
                        pwCount--;
                  }
            }
            })
            pageObj.push(weighingArray);
       }
       else if(line[0]=='Q' || line[0]=='q'){
            queryWeighingArray={};
            qwCount=8;
            queryWords=line.split(' ');
            queryWords.forEach(function(d){
                    if(d!='Q' && d!='q' && d){
                          if(!queryWeighingArray[d]){
                              queryWeighingArray[d]=qwCount;
                              qwCount--;
                      }
                  }    
            })
            queryObj.push(queryWeighingArray);
        }
    }
    queryObj.forEach(function(d){
      pageNumber=1;
        queryResult={};
        pageObj.forEach(function(e){
          pageStrength=0;
            for(var i in d){
               for(var j in e){
                 if(i==j){
                   pageStrength+=d[i]*e[j]; 
                  }
               }
            }
            if(pageStrength!=0){
               queryResult['P'+pageNumber]=pageStrength;
            }
            pageNumber++;
        })
        queryMainResult.push(queryResult);
    })

    //format the final output
    queryMainResult.forEach(function(d,i){
         var arr = sortObject(d),
             str='Q'+(i+1)+': ';
             if(arr){
              for(var i in arr){
                   str+=arr[i].key + ' ';
               }
             }
             outputString+=str+'\n';
     })
    displayOutput();

    //display the final output
    function displayOutput(){
      document.getElementById('outputContainer').value=outputString;
    }

   //function to sort the pages by calculated strength ratings
   function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return b.value - a.value;
    });
    return arr; // returns array
}

}