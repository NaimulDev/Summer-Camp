import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const VITE_IMAGE_KEY = import.meta.env.VITE_Image_Upload_token;
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
          const { name, price, category, recipe } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imgURL,
          };
          console.log(newItem);
          axiosSecure.post("/menu", newItem).then((data) => {
            console.log("after posting new menu item", data.data);
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
      {/* <div className="p-2 md:py-4 md:px-4 bg-lime-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Add Class</h2>
        </div>
        <form onClick={handleClasses}>
          <div className="text-center mx-auto md:w-1/2 ">
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-2xl font-semibold">
                  Class Name
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl font-semibold">
                  Seller Name
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="sellerName"
                  placeholder="Seller Name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl font-semibold">
                  Seller Email
                </span>
              </label>
              <label className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter coffee taste"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text text-2xl font-semibold">
                  Ablable Seats
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="quantity"
                  placeholder="Available quantity"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-2xl font-semibold">Price</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="price"
                  placeholder="price"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-2xl font-semibold">
                  Detail description
                </span>
              </label>
              <textarea
                name="details"
                id=""
                cols="30"
                rows="10"
                placeholder="Detail description"
                className="input input-bordered w-full"
              ></textarea>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-2xl font-semibold">
                  Picture URL of the toy
                </span>
              </label>
              <label className="input-group">
                <input
                  type="url"
                  name="img"
                  placeholder="Picture URL of the toy"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="text-center my-7">
              <input
                type="submit"
                className="btn-primary capitalize"
                value="Add Toy"
              />
            </div>
          </div>
        </form>
      </div> */}

      <div className=" px-10 w-1/2 items-center justify-center mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">class Name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
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
              placeholder="Recipe Name"
              {...register("name", { required: true, maxLength: 120 })}
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
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true, maxLength: 120 })}
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
              {...register("name", { required: true, maxLength: 120 })}
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
              {...register("recipe", { required: true })}
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
