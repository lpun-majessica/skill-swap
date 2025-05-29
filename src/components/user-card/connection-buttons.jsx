import { Button, PopUpButton } from "@/components/common/Buttons";
import { UserRoundPlus } from "lucide-react";

import { useDataContext } from "@/contexts/data-context";
import { useAuthContext } from "@/contexts/auth-context";

export function ConnectionsButtons({ connection, cardUserId }) {
	const { currentUser } = useAuthContext();
	const {
		users,
		createConnection,
		acceptConnection,
		rejectConnection,
		removeConnection,
	} = useDataContext();
	const cardUsername = users.find((user) => user.id === cardUserId).username;

	console.assert(
		connection.length <= 1,
		`There are ${connection.length} connections! Connection ID: ${connection[0]?.id}`
	);

	if (connection.length === 0) {
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

	const currConnection = connection[0];

	if (currConnection.isAccepted) {
		return (
			<PopUpButton
				variant="connected"
				username={cardUsername}
				handleClick={() => removeConnection(currConnection.id)}
			/>
		);
	} else if (currConnection.sender_id === currentUser.id) {
		return (
			<PopUpButton
				variant="pending"
				username={cardUsername}
				handleClick={() => removeConnection(currConnection.id)}
			/>
		);
	} else if (currConnection.receiver_id === currentUser.id) {
		return (
			<>
				<Button
					text="Decline"
					username={cardUsername}
					handleClick={() => rejectConnection(currConnection.id)}
				/>
				<Button
					text="Accept"
					username={cardUsername}
					handleClick={() => acceptConnection(currConnection.id)}
				/>
			</>
		);
	}
}
