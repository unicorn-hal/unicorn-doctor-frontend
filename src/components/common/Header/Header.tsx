import { useNavigate, useRouter } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import {
	Home,
	LogOutIcon,
	MessageCircle,
	SettingsIcon,
	UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { css } from "styled-system/css";
import { HStack } from "styled-system/jsx";
import { useAuth } from "~/components/providers/AuthProvider";
import { Avatar } from "~/components/ui/avatar";
import { Menu } from "~/components/ui/menu";
import { auth } from "~/infrastructure/firebase";

export const Header = () => {
	const router = useRouter();
	const navigate = useNavigate();
	const { currentUser, currentDoctor } = useAuth();
	const [currentPath, setCurrentPath] = useState(
		router.state.location.pathname,
	);
	useEffect(() => {
		if (!currentUser) {
			navigate({ to: "/signin" });
		}
	}, [currentUser, navigate]);

	const isActive = (path: string) => currentPath === path;
	const handleLinkClick = (path: string) => {
		setCurrentPath(path);
		navigate({
			to: path,
		});
	};

	const handleLogout = async () => {
		await signOut(auth);
	};

	return (
		<header
			className={css({
				bg: "white",
				borderBottom: "1px solid",
				borderColor: "gray.5",
			})}
		>
			<nav
				className={css({
					mx: "auto",
					px: { base: 4, sm: 6, lg: 8 },
					maxW: "container",
				})}
			>
				<div
					className={css({
						display: "flex",
						justifyContent: "space-between",
						height: "4rem",
					})}
				>
					<div className={css({ display: "flex" })}>
						<div
							className={css({
								flexShrink: 0,
								display: "flex",
								alignItems: "center",
							})}
						>
							<span
								className={css({
									fontSize: "xl",
									fontWeight: "bold",
									color: "primary",
								})}
							>
								UNICORN
							</span>
						</div>
						<div
							className={css({
								display: { base: "none", sm: "flex" },
								ml: { sm: 6 },
								gap: { sm: 8 },
							})}
						>
							<button
								type="button"
								className={css({
									display: "inline-flex",
									alignItems: "center",
									cursor: "pointer",
									px: 1,
									pt: 1,
									color: isActive("/doctors/home") ? "primary" : "gray.600",
									borderBottom: isActive("/doctors/home")
										? "2px solid"
										: "none",
									borderColor: isActive("/doctors/home") ? "primary" : "none",
									_hover: {
										color: "primary",
									},
								})}
								onClick={() => handleLinkClick("/doctors/home")}
							>
								<Home className={css({ w: 5, h: 5, mr: 1 })} />
								<span>ホーム</span>
							</button>
							<button
								type="button"
								className={css({
									display: "inline-flex",
									alignItems: "center",
									cursor: "pointer",
									px: 1,
									pt: 1,
									color: isActive("/doctors/chat") ? "primary" : "gray.600",
									borderBottom: isActive("/doctors/chat")
										? "2px solid"
										: "none",
									borderColor: isActive("/doctors/chat") ? "primary" : "none",
									_hover: {
										color: "primary",
									},
								})}
								onClick={() => handleLinkClick("/doctors/chat")}
							>
								<MessageCircle className={css({ w: 5, h: 5, mr: 1 })} />
								<span>チャット</span>
							</button>
						</div>
					</div>
					<Menu.Root>
						<Menu.Trigger asChild>
							<button
								type="button"
								className={css({
									display: { base: "none", sm: "flex" },
									ml: { sm: 6 },
									alignItems: "center",
									cursor: "pointer",
									outline: "none",
								})}
							>
								<Avatar src={currentDoctor?.doctorIconUrl} />
							</button>
						</Menu.Trigger>
						<Menu.Positioner>
							<Menu.Content>
								<Menu.ItemGroup>
									<Menu.ItemGroupLabel>
										{currentDoctor?.email}
									</Menu.ItemGroupLabel>
									<Menu.Separator />
									<Menu.Item value="profile">
										<HStack gap="6" justify="space-between" flex="1">
											<HStack gap="2">
												<UserIcon />
												医師情報
											</HStack>
										</HStack>
									</Menu.Item>
									<Menu.Item value="settings">
										<HStack gap="6" justify="space-between" flex="1">
											<HStack gap="2">
												<SettingsIcon /> 設定
											</HStack>
										</HStack>
									</Menu.Item>
									<Menu.Separator />
									<Menu.Item value="logout" onClick={handleLogout}>
										<HStack gap="2">
											<LogOutIcon />
											ログアウト
										</HStack>
									</Menu.Item>
								</Menu.ItemGroup>
							</Menu.Content>
						</Menu.Positioner>
					</Menu.Root>
				</div>
			</nav>
		</header>
	);
};
