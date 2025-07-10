"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useConnectionContext } from "@/contexts/connection-context";
import { useNotificationContext } from "@/contexts/notification-context";

import { clientSocket } from "@/lib/socket";
import connectionService from "@/services/connection";

export default function NavigationEvents() {
  const pathname = usePathname();
  const routeRef = useRef(pathname);
  const { data } = useSession();

  const { findConnectionWith } = useConnectionContext();
  const { createNotification } = useNotificationContext();

  useEffect(() => {
    const sender = process.env.NEXT_PUBLIC_DEMO_USER_ID;
    const receiver = data?.user;

    const isConnectedWithDemoUser = findConnectionWith(sender) ? true : false;

    const createDemoConnection = async () => {
      const type = "createConnection";

      const connection = await connectionService.addConnection({
        sender_id: sender,
        receiver_id: receiver,
      });
      const notification = await createNotification(sender, receiver, type);

      clientSocket.emit("connectionRequest", type, notification, connection);
    };

    if (pathname === "/onboarding") {
      routeRef.current === pathname;
    }

    if (
      data &&
      !isConnectedWithDemoUser &&
      routeRef.current !== pathname &&
      routeRef.current === "/onboarding"
    ) {
      createDemoConnection();
    }
  }, [pathname]);

  return;
}
