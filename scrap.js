

// const handleSubmit = (e) => {
//   e.preventDefault()

//   const payload = {
//         user_id: user.id,
//         title,
//         price,
//         description,
//         glitter_factor,
//         product_image,
//       };

//   let errs = []


//   if (payload.title === '' || payload.glitter_factor ==='' || payload.description ===''){
//   errs.push("Title, Glitter Factor, Description are needed field is required")

//   }else if(payload.title !== ''){

//   allProducts.map((product) => {

//   if(product.title === payload.title){
//   errs.push('This Title already exists')
//   }
//   return product
//   })

//   }



//   let isImage = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tif', '.tiff'];

//   if (payload.product_image !== ''){
//   let i = 0

//   while(!payload.product_image.endsWith(isImage[i] && i < isImage.length))

//   if(payload.product_image.endsWith(isImage[i])){
//   break

//   }else{
//   i++

//   }
//   }else{
//   errs.push('Must be a Valid Image)
//   }

//   if(errs.length){

//   setErrors(errs)

//   }
//   else{

//   dispatch(productActions.postTheProduct(payload));
//   history.push('/')

//   }
