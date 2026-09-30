import { useEffect, useState } from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";

const PREMIUM_ENTITLEMENT_ID = "premium";

/**
 * Returns whether the current user has an active "premium" entitlement.
 * Updates automatically right after a purchase / restore.
 */
export function usePremiumStatus() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const update = (info: CustomerInfo) => {
      if (!mounted) return;
      setIsPremium(
        typeof info.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== "undefined"
      );
    };

    Purchases.getCustomerInfo()
      .then(update)
      .catch((e) => console.log("Failed to check Premium status", e))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    Purchases.addCustomerInfoUpdateListener(update);

    return () => {
      mounted = false;
      Purchases.removeCustomerInfoUpdateListener(update);
    };
  }, []);

  return { isPremium, loading };
}