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

	const onSubmit = async () => {
		const user = await signInWithEmailAndPassword(auth, email, password);
		const token = await user.user.getIdToken();
		console.log(token);
		navigate({ to: "/doctors/home" });
	};
	
  return (
		<>
			<div>
				<h1>Sign In</h1>
				<div>
					<div>
						<label>Email</label>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label>password</label>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button onClick={onSubmit}>Sign In</Button>
				</div>
			</div>
		</>
	);
}
