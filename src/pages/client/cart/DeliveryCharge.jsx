import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DeliveryCharge(props) {
  const { setDelivery, amount, delivery } = props;
  const navigate = useNavigate();
  // const deliveryRanges = [
  //   { min: 300, max: 400, cost: 11.35 },
  //   { min: 400, max: 500, cost: 12.35 },
  //   { min: 500, max: 600, cost: 13.35 },
  //   { min: 600, max: 700, cost: 14.35 },
  //   { min: 700, max: 800, cost: 15.35 },
  //   { min: 800, max: 900, cost: 16.35 },
  //   { min: 900, max: 1000, cost: 17.35 },
  //   { min: 1000, max: 1100, cost: 22.2 },
  //   { min: 1100, max: 1200, cost: 22.7 },
  //   { min: 1200, max: 1300, cost: 23.2 },
  //   { min: 1300, max: 1400, cost: 23.7 },
  //   { min: 1400, max: 1500, cost: 24.2 },
  //   { min: 1500, max: 1600, cost: 24.7 },
  //   { min: 1600, max: 1700, cost: 25.2 },
  //   { min: 1700, max: 1800, cost: 25.7 },
  //   { min: 1800, max: 1900, cost: 26.2 },
  //   { min: 1900, max: 1999, cost: 26.7 },
  //   { min: 2000, max: 8000, cost: 0 },
  // ];
  const deliveryRanges = [
    { min: 300, max: 400, cost: 13 },
    { min: 400, max: 500, cost: 14 },
    { min: 500, max: 600, cost: 15 },
    { min: 600, max: 700, cost: 16 },
    { min: 700, max: 800, cost: 17 },
    { min: 800, max: 900, cost: 18 },
    { min: 900, max: 1000, cost: 19 },
    { min: 1000, max: 8000, cost: 25 },
  ];

  function calculateDeliveryCost() {
    if (!amount) return 0;
    if (amount < 300) {
      if (window.location.pathname != "/panier") navigate("/panier");
      return 13;
    }

    for (const range of deliveryRanges) {
      if (amount >= range.min && amount <= range.max) {
        return range.cost;
      }
    }
    return 0; // Default value if the amount is not within any range
  }
  useEffect(() => {
    setDelivery(calculateDeliveryCost(amount));
  }, [amount]);

  return <>{delivery === 0 ? "Gratuit" : `${delivery} Euro`}</>;
}
