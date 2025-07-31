import { useEffect } from "react";
import { useState } from "react";

export default function UserDeliveryInfo() {
  const [detailsInfo, setDetailsInfo] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setDetailsInfo(
      `${user.civilite} ${user.firstName} ${user.lastName} ${user.address},${user.postalCode}, ${user.country}`,
    );
    return () => {};
  }, []);

  return <>{detailsInfo}</>;
}
