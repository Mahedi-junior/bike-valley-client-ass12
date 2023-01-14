import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthProvider";

export default function BookingModal({
  isOpen,
  closeModal,
  bookingProduct,
  setBookingProduct,
}) {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const handleBookingPhone = (data) => {
    const name = data.productName;
    fetch("https://bike-valley-server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        image: bookingProduct.image,
        bookingId: bookingProduct._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setBookingProduct(null);
          toast.success(`${name} is booked successfully!`);
        }
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    onClick={() => {
                      closeModal();
                      setBookingProduct(null);
                    }}
                    className="border w-8 h-8 rounded-full flex justify-center items-center absolute right-2 top-2 cursor-pointer border-gray-800"
                  >
                    <MdOutlineClose size={24} />
                  </div>
                  <form
                    onSubmit={handleSubmit(handleBookingPhone)}
                    className="grid grid-cols-1 gap-4 mt-5"
                  >
                    <input
                      {...register("buyerName", { required: true })}
                      type="text"
                      defaultValue={user?.displayName}
                      readOnly
                      className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg bg-slate-200"
                    />
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      defaultValue={user?.email}
                      readOnly
                      className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg bg-slate-200"
                    />
                    <input
                      {...register("productName", { required: true })}
                      type="text"
                      defaultValue={bookingProduct.name}
                      readOnly
                      className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg bg-slate-200"
                    />
                    <input
                      {...register("price", { required: true })}
                      type="text"
                      defaultValue={`$${bookingProduct.resalePrice}`}
                      readOnly
                      className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg bg-slate-200"
                    />

                    <input
                      {...register("phone", { required: true })}
                      type="text"
                      placeholder="Phone Number"
                      className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
                    />
                    <input
                      {...register("location", { required: true })}
                      type="text"
                      placeholder="Meeting Location"
                      className="outline-none border-2 border-black pl-3 py-1.5 rounded-lg"
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Book
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
