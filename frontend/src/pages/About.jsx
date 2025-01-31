import React from 'react';

export default function About() {
  return (
    <div className="about-container">
      {/* Main Title */}
      <h1 className="about-title" style={{color:'black'}}>ROYAL BETTING MANAGEMENT</h1>
      <br />

      {/* Introduction Section */}
      <section className="about-section intro-section">
        <h2 className="section-title" style={{color:'black'}}>INTRODUCTION</h2>
        <p className="section-content">
          The Betting Management System is an innovative web application designed to help users manage their bets, view their betting history, and authenticate securely using their accounts. 
          Created by Anne Muriuki, this system enables users to efficiently handle their betting activities while ensuring proper authentication and data security.
        </p>
      </section>
      <br />

      {/* Problem Statement Section */}
      <section className="about-section problem-section">
        <h2 className="section-title" style={{color:'black'}}>PROBLEM STATEMENT</h2>
        <p className="section-content">
          Managing bets and user information can become cumbersome without a proper system. Many users may rely on manual processes or outdated methods for managing their betting activities, which can lead to:
          <ul>
            <li>Data Redundancy and Errors: Difficulty in tracking bets, outcomes, and balances.</li>
            <li>Difficulty in Managing Users: Risks of unauthorized access or lost user information.</li>
          </ul>
        </p>
      </section>
      <br />

      {/* Proposed Solution Section */}
      <section className="about-section solution-section">
        <h2 className="section-title" style={{color:'black'}}>PROPOSED SOLUTION</h2>
        <p className="section-content">
          I propose developing a Betting Management System to solve these challenges. The system will enable users to manage their accounts, place and track bets, and have secure authentication with session management. Key features will include:
          <ul>
            <li>Structured Data Management: Centralized management of users and their bets.</li>
            <li>CRUD Operations: Easy-to-use functions for creating, viewing, updating, and deleting bets.</li>
            <li>Authentication: Secure user registration, login, and session management.</li>
          </ul>
        </p>
      </section>
      <br />


      {/* Team Section */}
      <section className="about-section team-section">
        <h2 className="section-title" style={{color:'black'}}>FOUNDER</h2>
        <ul className="team-list">
          <li className="team-member">
            <strong className="member-name" style={{color:'black'}}>Anne Muriuki</strong>: A web developer focused on creating secure, user-friendly experiences for the Betting Management System.
          </li>
        </ul>
      </section>
      <br />
    </div>
  );
}
