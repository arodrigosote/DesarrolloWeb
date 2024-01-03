import React from 'react';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import Service from '../Components/Services/Service';
import SocialMedia from '../Components/SocialMedia/SocialMedia';

export default function Home() {
    return (
        <>
            <Header></Header>
            <Hero></Hero>
            <Service></Service>
            <SocialMedia></SocialMedia>
        </>
    )
}
