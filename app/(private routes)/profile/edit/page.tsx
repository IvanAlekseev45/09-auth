"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import css from "./page.module.css";

import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const Page = () => {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getMe();

        setUsername(user.username);
        setEmail(user.email);
        setAvatar(user.avatar);
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const updatedUser = await updateMe({
        username,
      });

      setUser(updatedUser);

      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar && (
          <Image src={avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />
        )}

        <form className={css.profileInfo} onSubmit={onSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={css.input}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
