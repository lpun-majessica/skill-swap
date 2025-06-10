import { Button, PopUpButton } from "@/components/common/buttons";
import { UserRoundPlus } from "lucide-react";

import { useConnectionContext } from "@/contexts/connection-context";
import { useCurrentUserContext } from "@/contexts/current-user-context";

export function ConnectionsButtons({ connection, cardUserId, cardUsername }) {
  const { currentUser } = useCurrentUserContext();
  const { createConnection, updateConnection, removeConnection } =
    useConnectionContext();

  if (!connection) {
    return (
      <Button
        text="Connect"
        username={cardUsername}
        handleClick={() => createConnection(currentUser.id, cardUserId)}
      >
        <UserRoundPlus />
      </Button>
    );
  }

  if (connection.isAccepted) {
    return (
      <PopUpButton
        variant="connected"
        username={cardUsername}
        handleClick={() => removeConnection(connection.id)}
      />
    );
  } else if (connection.sender_id === currentUser.id) {
    return (
      <PopUpButton
        variant="pending"
        username={cardUsername}
        handleClick={() => removeConnection(connection.id)}
      />
    );
  } else if (connection.receiver_id === currentUser.id) {
    return (
      <>
        <Button
          text="Decline"
          username={cardUsername}
          handleClick={() => removeConnection(connection.id)}
        />
        <Button
          text="Accept"
          username={cardUsername}
          handleClick={() => updateConnection(connection.id)}
        />
      </>
    );
  }
}
