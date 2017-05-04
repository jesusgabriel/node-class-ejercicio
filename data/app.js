var productTemplate = '<h3>Name<%= name %></h3>'+
'<h3>Price<%= price %></h3>'+
'<h3>Type<%= type %></h3>'+
'<h3>Status<%= status %></h3>';
var foods=[];

var makeTemplate=function(data){
   var li=document.createElement('li');
   var prodList=document.querySelector('.lion-list');
   var compiled=_.template(productTemplate);
   var prodHtml=compiled(data);
   li.innerHTML=prodHtml;
   prodList.insertBefore(li,prodList.firstChild);
}
var updateProducts=function(){
   var productData=foods[foods.length-1];
   makeTemplate(productData);
}

var getValues= function(){
   var name=document.querySelector('input[name=namefood]').value;
   var type=document.querySelector('input[name=type]').value;
   var status=document.querySelector('input[name=status]').value;
   var price=document.querySelector('input[name=price]').value;
   return {
       name:name,
       type:type,
       status:status,
       price:price
   };
};
var makeList=function(){
   foods.forEach(function(product){
       makeTemplate(product);
       console.log(product);
   });
};

var getAllProducts= function(){
   fetch('/foods')
   .then(function(resp){
       return resp.json();

   })
   .then(function(data){
       foods=foods.concat(data);
       console.log(foods);
       makeList();
   });

};
(function(){
   getAllProducts();
   var form=document.querySelector('form');
   form.addEventListener('submit',function(e){
       e.preventDefault();
       var values=getValues();
       console.log(values);
       fetch('/foods',{
           method:'post',
           headers:{
               'Accept':'application/json',
               'Content-Type':'application/json'
           },
           body:JSON.stringify(values)
       })
       .then(function(resp){
           return resp.json();
       })
       .then(function(createdProduct){
           foods.push(createdProduct);
           console.log(foods);
           updateProducts();
       })
       return false;
   })
