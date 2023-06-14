import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const VITE_IMAGE_KEY = import.meta.env.VITE_IMAGE_KEY;
const AddClasses = () => {
  // const handleClasses = (event) => {
  //   event.preventDefault();

  //   const form = event.target;
  //   const img = form.img.value;
  //   const name = form.name.value;
  //   const sellerName = form.sellerName.value;
  //   const email = form.email.value;

  //   const price = form.price.value;

  //   const quantity = form.quantity.value;
  //   const details = form.details.value;
  //   const addClass = {
  //     name,
  //     sellerName,
  //     email,
  //     price,
  //     quantity,
  //     details,
  //     img,
  //   };

  //   fetch("https://toy-marketplace-server-dusky-eight.vercel.app/toyProducts", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(addClass),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.insertedId) {
  //         Swal.fire({
  //           title: "Success!",
  //           text: "Add toys successfully",
  //           icon: "success",
  //           confirmButtonText: "Ok",
  //         });
  //         form.reset();
  //       }
  //     });
  // };

  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${VITE_IMAGE_KEY}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            name,
            insName,
            email,
            seats,
            price,
            category,
            classDetails,
            image,
          } = data;
          const newItem = {
            name,
            insName,
            email,
            seats,
            price: parseFloat(price),
            category,
            classDetails,
            image: imgURL,
            status: "pending",
          };

          axiosSecure.post("/addclasses", newItem).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  return (
    <div className="max-w-6xl  mx-auto text-center">
      <div className=" px-10 w-1/2 items-center justify-center mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">class Name*</span>
            </label>
            <input
              type="text"
              placeholder="Class Name"
              {...register("name", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Instructor Name*</span>
            </label>
            <input
              type="text"
              placeholder="Instructor Name"
              {...register("insName", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">
                Instructor Email*
              </span>
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Ablable Seats*</span>
            </label>
            <input
              type="text"
              placeholder="Ablable Seats"
              {...register("seats", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="flex my-4">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="Pick One"
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option disabled>Pick One</option>
                <option>Cricket</option>
                <option>Footbal</option>
                <option>Basket ball</option>
                <option>Hokey</option>
              </select>
            </div>
            <div className="form-control w-full ml-4">
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Details</span>
            </label>
            <textarea
              {...register("classDetails", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Class Image*</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full "
            />
          </div>
          <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
        </form>
      </div>
    </div>
  );
};

export default AddClasses;
