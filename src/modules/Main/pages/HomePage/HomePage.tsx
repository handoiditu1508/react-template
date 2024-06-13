import CONFIG from "@/configs";
import { Button, Divider } from "@mui/material";
import { CodeResponse, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

type TokenResponse = {
  access_token: string;
  expires_in: number;// seconds
  refresh_token: string;
  scope: string;
  token_type: string; // Bearer
  id_token: string;
};

type RefreshTokenResponse = Omit<TokenResponse, "refresh_token">;

type UserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

function HomePage() {
  const [codeResponse, setCodeResponse] = useState<Omit<CodeResponse, "error" | "error_description" | "error_uri">>();
  const [tokens, setTokens] = useState<TokenResponse>();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setCodeResponse(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });

  const getTokens = async () => {
    if (!codeResponse) {
      return;
    }

    const body = {
      code: codeResponse.code,
      client_id: CONFIG.CLIENT_ID,
      client_secret: CONFIG.CLIENT_SECRET,
      redirect_uri: "http://localhost:5173",
      grant_type: "authorization_code",
    };

    const response = await axios.post<TokenResponse>("https://oauth2.googleapis.com/token", body);

    setTokens(response.data);

    console.log("tokens", response.data);
  };

  const getUserInfo = async () => {
    if (tokens) {
      const response = await axios.get<UserInfo>("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: "application/json",
        },
      });

      setUserInfo(response.data);

      console.log("user info", response.data);
    }
  };

  const refreshAccessToken = async () => {
    if (tokens) {
      const body = {
        client_id: CONFIG.CLIENT_ID,
        client_secret: CONFIG.CLIENT_SECRET,
        refresh_token: tokens.refresh_token,
        grant_type: "refresh_token",
      };
      const response = await axios.post<RefreshTokenResponse>("https://www.googleapis.com/oauth2/v4/token", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setTokens({
        ...response.data,
        ...tokens,
      });

      console.log("new tokens", response.data);
    }
  };

  const logOut = () => {
    googleLogout();
    setCodeResponse(undefined);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {codeResponse ? (
        <>
          <Divider variant="middle">Back end</Divider>
          <Button color="success" onClick={getTokens}>Get tokens</Button>
          {tokens && <Button color="info" onClick={getUserInfo}>Get user info</Button>}
          {tokens && <Button color="secondary" onClick={refreshAccessToken}>Refresh access token</Button>}
          <Divider variant="middle">Front end</Divider>
          <Button color="warning" onClick={logOut}>Log out</Button>
        </>
      ) : (
        <>
          <Divider variant="middle">Front end</Divider>
          <Button color="primary" onClick={() => login()}>Sign in with Google 🚀 </Button>
        </>
      )}
    </div>
  );
}

export default HomePage;
