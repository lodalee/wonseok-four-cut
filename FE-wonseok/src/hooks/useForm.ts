// const useForm = () => {

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;
//     if (name === "price") {
//       newValue = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     }
//     setFormData({ ...formData, [name]: newValue });
//     console.log(formData);
//   };

//   return (
//     <div>useForm</div>
//   )
// }
// export default useForm
