'use client'
import { useState } from 'react';

export default function ClientComponent() {
    const [manyouPussy, setManYouPussy] = useState<boolean>(false);

    function handleClick(): void {
        setManYouPussy(!manyouPussy);
    }
    
    return (
        <div className="text-center">
            <h1>This is a nested route lol</h1>
            <button onClick={handleClick}>click me bro</button>
            {manyouPussy && 
            <p>man you pussy</p>}
        </div>
    );
  }
  