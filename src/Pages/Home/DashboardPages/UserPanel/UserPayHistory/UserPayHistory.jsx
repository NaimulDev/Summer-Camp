import { Helmet } from "react-helmet-async";

import { userEmailToPayment } from "../../../../../hooks/usePayment";

const UserPayHistory = () => {
  const [payments] = userEmailToPayment();

  return (
    <div>
      <Helmet>
        <title>Pallikoodam || My Enrol</title>
      </Helmet>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-lg">
              <th>Class</th>
              <th>InstructorEmail</th>
              <th>amount</th>
              <th>TransitionId</th>
              <th>payment</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay?._id}>
                <td>
                  <span className="text-base font-medium">
                    {pay?.className}
                  </span>
                </td>
                <td>{pay?.insEmail}</td>
                <td>${pay?.price}</td>
                <td>${pay?.transactionId}</td>
                <td>
                  <p className=" text-sm text-green-500 bg-slate-200 text-center py-2 rounded-lg">
                    confirm
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayHistory;
