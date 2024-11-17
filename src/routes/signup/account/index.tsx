import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Field } from "~/components/ui/field";
import { auth } from "~/infrastructure/firebase";

export const Route = createFileRoute("/signup/account/")({
	component: SighUp,
});

function SighUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [invalidPassword, setInvalidPassword] = useState(false);
	const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);
	const navigator = useNavigate();

	const handleSubmit = async () => {
		try {
			if (password !== confirmPassword) {
				setConfirmPasswordInvalid(true);
				return
			}
			setIsSubmitting(true);
			const result = await createUserWithEmailAndPassword(auth, email, password);
			console.log(result);
			navigator({ to: "/signin" });
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === "auth/invalid-email") {
					setInvalidEmail(true);
				} else if (error.code === "auth/weak-password") {
					setInvalidPassword(true);
				} else {
					console.error(error);
				}
			}
			setIsSubmitting(false);
		}
	}
	return (
		<div
			className={css({
				display: "flex",
				justifyContent: "center",
				marginY: "100px",
			})}
		>
			<Card.Root w={"500px"}>
				<Card.Header>
					<Card.Title>サインアップ</Card.Title>
				</Card.Header>
				<Card.Body
					className={css({
						display: "flex",
						flexDirection: "column",
						gap: "20px",
					})}
				>
					<Field.Root
						invalid={invalidEmail}
					>
						<Field.Label>Email</Field.Label>
						<Field.Input type="email"
							value={email}
							placeholder="メールアドレスを入力してください"
							onChange={(e) => {
								setEmail(e.target.value)
								setInvalidEmail(false);
							}}
						/>
						<Field.ErrorText>
							無効なメールアドレスです
						</Field.ErrorText>
					</Field.Root>
					<Field.Root
						invalid={confirmPasswordInvalid || invalidPassword}
					>
						<Field.Label>パスワード (6文字以上の半角英数字)</Field.Label>
						<Field.Input type="password"
							value={password}
							placeholder="パスワードを入力してください"
							onChange={(e) => {
								setPassword(e.target.value)
								setInvalidPassword(false);
							}}
						/>
						<Field.ErrorText>
							{confirmPasswordInvalid ? "パスワードが一致しません" : "パスワードが不正です"}
						</Field.ErrorText>
					</Field.Root>
					<Field.Root
						invalid={confirmPasswordInvalid}
					>
						<Field.Label>パスワードを再入力してください</Field.Label>
						<Field.Input type="password"
							value={confirmPassword}
							placeholder="パスワードを再入力してください"
							onChange={(e) => {
								setConfirmPassword(e.target.value)
								setConfirmPasswordInvalid(false)
							}}
						/>
						<Field.ErrorText>パスワードが一致しません</Field.ErrorText>
					</Field.Root>
					<Button onClick={handleSubmit} loading={isSubmitting}>
						サインアップ
					</Button>
				</Card.Body>

			</Card.Root>
		</div >
	);
}
