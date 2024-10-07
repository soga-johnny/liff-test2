'use client';
import { useLiff } from '@/app/components/LiffProvider';
import { Profile } from '@liff/get-profile';

import { useState } from 'react';

export function Profiles() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { liff } = useLiff();

  if (liff?.isLoggedIn()) {
    (async () => {
      const profile = await liff.getProfile();
      setProfile(profile);
    })();
  }

  return (
    <div>
      {profile && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */},
          <img src={profile.pictureUrl} alt='profile' />
          <p>userId: {profile.userId}</p>
          <p>displayName: {profile.displayName}</p>
        </>
      )}
      {profile ? (
        <button
          onClick={() => {
            liff?.logout();
            location.reload();
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={() => liff?.login()}>login</button>
      )}
    </div>
  );
}