
import { supabase } from '@/integrations/supabase/client';

// This function can be run once manually from the admin page or console
// to create a default admin user if needed
export const setupDefaultAdmin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error creating admin user:', error.message);
      return { success: false, message: error.message };
    }

    return { 
      success: true, 
      message: 'Default admin account created successfully! Check your email to confirm the account.',
      data 
    };
  } catch (err) {
    console.error('Unexpected error creating admin user:', err);
    return { success: false, message: 'An unexpected error occurred' };
  }
};

// Example usage:
// setupDefaultAdmin('admin@sisterstories.com', 'SecurePassword123!')
