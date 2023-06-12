import React from "react";

const AddClasses = () => {
  const handleClasses = (event) => {
    event.preventDefault();

    const form = event.target;
    const img = form.img.value;
    const name = form.name.value;
    const sellerName = form.sellerName.value;
    const email = form.email.value;

    const price = form.price.value;

    const quantity = form.quantity.value;
    const details = form.details.value;
    const addClass = {
      name,
      sellerName,
      email,
      price,
      quantity,
      details,
      img,
    };

    fetch("https://toy-marketplace-server-dusky-eight.vercel.app/toyProducts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addClass),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Add toys successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          form.reset();
        }
      });
  };
  return (
    <div className="max-w-6xl mx-auto text-center">
      <div className="p-2 md:py-4 md:px-4 bg-lime-200">
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
      </div>
    </div>
  );
};

export default AddClasses;
