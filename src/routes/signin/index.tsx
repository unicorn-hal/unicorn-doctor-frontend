import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { css } from "styled-system/css";
import { useAuth } from "~/components/providers/AuthProvider";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { auth } from "~/infrastructure/firebase";

export const Route = createFileRoute("/signin/")({
	component: SignInApp,
});

export function SignInApp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [invalid, setInvalid] = useState(false);
	const { setCurrentDoctor, currentUser, currentDoctor } = useAuth();
	const navigator = useNavigate();

	useEffect(() => {
		if (currentUser && currentDoctor) {
			navigator({ to: "/doctors/home" });
		} else if (currentUser && currentDoctor === null) {
			navigator({ to: "/signup/doctor" });
		}
	}, [currentDoctor, currentUser, navigator]);

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);
			await signInWithEmailAndPassword(auth, email, password);
			await setCurrentDoctor();
		} catch (error) {
			setInvalid(true);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div
				className={css({
					display: "flex",
					justifyContent: "center",
					marginY: "100px",
				})}
			>
				<Card.Root w={"500px"}>
					<Card.Header>
						<Card.Title>サインイン</Card.Title>
					</Card.Header>
					<Card.Body
						className={css({
							display: "flex",
							flexDirection: "column",
							gap: "20px",
						})}
					>
						<Field.Root invalid={invalid}>
							<Field.Label>Email</Field.Label>
							<Input
								type="email"
								placeholder="メールアドレスを入力してください"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setInvalid(false);
								}}
							/>
							<Field.ErrorText>パスワードもしくはメールアドレスが間違っています</Field.ErrorText>
						</Field.Root>
						<Field.Root invalid={invalid}>
							<Field.Label>パスワード</Field.Label>
							<Input
								type="password"
								placeholder="パスワードを入力してください"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setInvalid(false);
								}}
							/>
							<Field.ErrorText>パスワードもしくはメールアドレスが間違っています</Field.ErrorText>
						</Field.Root>
						<Button onClick={handleSubmit} loading={isSubmitting}>
							サインイン
						</Button>
					</Card.Body>
				</Card.Root>
			</div>
		</>
	);
}
