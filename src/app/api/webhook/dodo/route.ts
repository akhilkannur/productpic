import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with Service Role Key to bypass RLS for updating profiles
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // NOTE: You'll need to verify the Dodo signature here once you have your secret
    // For now, we'll handle the 'payment.succeeded' event
    if (payload.event === 'payment.succeeded') {
      const email = payload.data.customer_email;
      
      console.log(`Payment success for: ${email}`);

      // 1. Find user by email in profiles or auth.users
      // 2. Update 'has_access' to true
      const { error } = await supabase
        .from('profiles')
        .update({ has_access: true })
        .eq('email', email); // Ensure you have an 'email' column in profiles

      if (error) {
        console.error('Error updating profile access:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}
