import { useConnectionContext } from "@/contexts/connection-context";
import { useCurrentUserContext } from "@/contexts/current-user-context";

import { clientSocket } from "@/lib/socket";

import { Button, PopUpButton } from "@/components/common/buttons";
import { UserRoundPlus } from "lucide-react";

export function ConnectionsButtons({
  connection,
  targetUserId,
  targetUsername,
}) {
  const { currentUser } = useCurrentUserContext();
  const { createConnection, updateConnection, removeConnection } =
    useConnectionContext();

  const handleCreateConnection = async () => {
    const newConnection = await createConnection(currentUser.id, targetUserId);
    clientSocket.emit("connectionRequest", "createConnection", newConnection);
  };

  const handleRemoveConnection = () => {
    removeConnection(connection.id);
  };

  const handleAcceptConnection = async () => {
    const updatedConnection = await updateConnection(connection.id);
    clientSocket.emit(
      "connectionRequest",
      "acceptConnection",
      updatedConnection,
    );
  };

  if (!connection) {
    return (
      <Button
        text="Connect"
        username={targetUsername}
        onClick={handleCreateConnection}
      >
        <UserRoundPlus />
      </Button>
    );
  }

  if (connection.isAccepted) {
    return (
      <PopUpButton
        variant="connected"
        username={targetUsername}
        onClick={handleRemoveConnection}
      />
    );
  } else if (connection.sender_id === currentUser.id) {
    return (
      <PopUpButton
        variant="pending"
        username={targetUsername}
        onClick={handleRemoveConnection}
      />
    );
  } else if (connection.receiver_id === currentUser.id) {
    return (
      <>
        <Button
          text="Decline"
          username={targetUsername}
          onClick={handleRemoveConnection}
        />
        <Button
          text="Accept"
          username={targetUsername}
          onClick={handleAcceptConnection}
        />
      </>
    );
  }
}
