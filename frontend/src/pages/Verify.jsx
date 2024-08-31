import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { urlAtom } from "../store/atoms";

function Verify() {
    const [params] = useSearchParams();
    const success = params.get("success");
    const orderId = params.get("orderId");
    const navigate = useNavigate();
    const url = useRecoilValue(urlAtom);

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Verification error:", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [url, success, orderId, navigate]);

    return (
        <div className="verify min-h-[60vh] grid">
            <div className="spinner w-24 h-24 place-self-center border-2 border-red-600 border-t-gray-500 rounded-[50%] animate-spin"></div>
        </div>
    );
}

export default Verify;
