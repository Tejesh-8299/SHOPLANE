import { useState } from "react";
import "./Checkout.css";

function Checkout() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Validation
  const validate = () => {
    let errs = {};

    if (!form.name.trim()) {
      errs.name = "Name is required";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Enter valid email";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      errs.phone = "Enter valid 10-digit phone";
    }

    if (!form.address.trim()) {
      errs.address = "Address required";
    }

    if (!form.city.trim()) {
      errs.city = "City required";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      errs.pincode = "Enter valid 6-digit pincode";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  // Submit
  const handleSubmit = () => {
    if (validate()) {
      alert("Proceeding to payment...");
    }
  };

  return (
    <div className="checkout">

      {/* Steps */}
      <div className="steps">
        <span className="active">Delivery</span>
        <span>Payment</span>
        <span>Confirm</span>
      </div>

      {/* Form */}
      <div className="form">

        <div className="row">

          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div>
          <textarea
            name="address"
            placeholder="Address"
            rows="4"
            onChange={handleChange}
          ></textarea>

          {errors.address && (
            <p className="error">{errors.address}</p>
          )}
        </div>

        <div className="row">

          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
            />

            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          <div>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              maxLength={6}
              onChange={handleChange}
            />

            {errors.pincode && (
              <p className="error">{errors.pincode}</p>
            )}
          </div>

        </div>

        <button onClick={handleSubmit}>
          Continue to Payment
        </button>

      </div>

    </div>
  );
}

export default Checkout;