import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { auth } from "~/infrastructure/firebase";

export const Route = createFileRoute("/signin/")({
	component: SignInApp,
});

export function SignInApp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async () => {
		const user = await signInWithEmailAndPassword(auth, email, password);
		if (!user) return;
		navigate({ to: "/doctors/home" });
	};

	return (
		<>
			<div>
				<h1>Sign In</h1>
				<div>
					<div>
						<div>Email</div>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div>password</div>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button onClick={handleSubmit}>Sign In</Button>
				</div>
			</div>
		</>
	);
}
