"use client";

import React from "react";
import { appStyles } from "@/styles/ui";
import SignIn from '../components/SignIn';
import Header from '../components/Header';
import HomeComponent from "@/components/HomeComponent";

export default function HomePage() {


  return (
    <div style={appStyles}>
      <Header title="Home"/>
      <SignIn/>
      <HomeComponent/>
    </div>
  );
}
