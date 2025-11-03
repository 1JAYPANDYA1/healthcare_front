import React, { useState } from "react";
import { toast } from "react-toastify";

const specialization = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Psychiatrist",
  "Dentist",
  "General Practitioner",
  "ENT Specialist",
  "Ophthalmologist",
];

const availableDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const QualificationsForm = ({
  register,
  watch,
  isCustomAvailability,
  setIsCustomAvailability,
}) => {
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Fixed: Added image/png and corrected image/jpg to image/jpeg
      const acceptedTypes = [
        "application/pdf", 
        "image/jpeg",  // Covers both .jpg and .jpeg
        "image/png"    // Added PNG support
      ];

      if (!acceptedTypes.includes(file.type)) {
        toast.error("Only PDF, JPG, JPEG, and PNG files are allowed");
        e.target.value = "";
        setPhoto(null);
        return;
      }

      // Optional: Check file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size should not exceed 5MB");
        e.target.value = "";
        setPhoto(null);
        return;
      }

      setPhoto(file);
      toast.success("File uploaded successfully!");
    }
  };

  const validateTimeRange = (timeFrom, timeTo) => {
    console.log("component", timeFrom, timeTo);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Qualifications
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specialist Type
        </label>
        <select
          {...register("specialization", {
            required: true,
            onChange: (e) => {
              if (!e.target.value) {
                toast.error("Please select a specialization");
              }
            },
          })}
          className="mt-1 block w-full border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none rounded-md px-3 py-2"
        >
          <option value="">Select Specialist Type</option>
          {specialization.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Experience (years)
        </label>
        <input
          type="number"
          min="0"
          {...register("experience", {
            required: true,
            min: 0,
            onChange: (e) => {
              if (!e.target.value) {
                toast.error("Please enter your years of experience");
              } else if (e.target.value < 0) {
                toast.error("Experience cannot be negative");
              }
            },
          })}
          className="mt-1 block w-full border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Qualifications (PDF, JPG, JPEG, PNG)
        </label>
        <input
          type="file"
          {...register("qualifications", {
            required: true,
            onChange: handleFileChange,
          })}
          className="mt-1 block w-full border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none rounded-md px-3 py-2"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        />
        {photo && (
          <p className="mt-2 text-sm text-green-600">
            Selected file: {photo.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Availability
        </label>
        <select
          {...register("availability", {
            required: true,
            onChange: (e) => {
              setIsCustomAvailability(e.target.value === "Custom");
              if (!e.target.value) {
                toast.error("Please select your availability");
              }
            },
          })}
          className="mt-1 block w-full border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none rounded-md px-3 py-2"
        >
          <option value="">Select Availability</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      {isCustomAvailability && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Days
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {availableDays.map((day) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  {...register("customDays", {
                    validate: (value) => {
                      if (
                        isCustomAvailability &&
                        (!value || value.length === 0)
                      ) {
                        toast.error("Please select at least one day");
                        return false;
                      }
                      return true;
                    },
                  })}
                  value={day}
                  className="mr-2"
                />
                <label>{day}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Available Time
        </label>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">From</label>
            <input
              type="time"
              {...register("timeFrom", {
                required: true,
                onChange: (e) => {
                  if (!e.target.value) {
                    toast.error("Please select start time");
                  }
                },
              })}
              className="mt-1 block w-full border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">To</label>
            <input
              type="time"
              {...register("timeTo", {
                required: true,
                validate: (value) => {
                  const timeFrom = watch("timeFrom");
                  if (timeFrom && value && value <= timeFrom) {
                    toast.error("End time must be after start time");
                    return "End time must be after start time";
                  }
                  return true;
                },
              })}
              className="mt-1 block w-full border-2 border-green-300 focus:ring-green-600 focus:border-green-600 outline-none rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationsForm;