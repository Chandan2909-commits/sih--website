// Clerk Authentication Configuration
const CLERK_PUBLISHABLE_KEY = 'pk_test_YWR2YW5jZWQtcGVnYXN1cy00LmNsZXJrLmFjY291bnRzLmRldiQ';

let clerk;

// Initialize Clerk
async function initializeClerk() {
    try {
        console.log('Initializing Clerk with key:', CLERK_PUBLISHABLE_KEY.substring(0, 20) + '...');
        
        if (!window.Clerk) {
            console.error('Clerk not loaded');
            return;
        }
        
        clerk = new window.Clerk(CLERK_PUBLISHABLE_KEY);
        await clerk.load({
            // Allow localhost for development
            allowedOrigins: ['http://localhost:5500', 'http://127.0.0.1:5500']
        });
        
        console.log('Clerk loaded successfully');
        
        // Check authentication state
        if (clerk.user) {
            console.log('User already signed in');
            showSignedInState();
        } else {
            console.log('User not signed in');
            showSignedOutState();
        }
        
        // Listen for auth state changes
        clerk.addListener('user', (user) => {
            console.log('Auth state changed:', user ? 'signed in' : 'signed out');
            if (user) {
                showSignedInState();
            } else {
                showSignedOutState();
            }
        });
        
    } catch (error) {
        console.error('Failed to initialize Clerk:', error);
        alert('Authentication system failed to load. Please refresh the page.');
    }
}

// Show signed in state
function showSignedInState() {
    const signedOut = document.getElementById('clerk-signed-out');
    const signedIn = document.getElementById('clerk-signed-in');
    
    if (signedOut) signedOut.style.display = 'none';
    if (signedIn) signedIn.classList.remove('hidden');
    
    // Mount user button
    const userButtonDiv = document.getElementById('clerk-user-button');
    if (userButtonDiv && clerk && clerk.user) {
        clerk.mountUserButton(userButtonDiv);
    }
}

// Show signed out state
function showSignedOutState() {
    const signedOut = document.getElementById('clerk-signed-out');
    const signedIn = document.getElementById('clerk-signed-in');
    
    if (signedOut) signedOut.style.display = 'block';
    if (signedIn) signedIn.classList.add('hidden');
}

// Sign in handler
function handleSignIn() {
    console.log('Sign in button clicked');
    if (clerk) {
        console.log('Opening Clerk sign in modal');
        clerk.openSignIn();
    } else {
        console.error('Clerk not initialized yet');
        alert('Please wait for the page to fully load and try again.');
    }
}

// Initialize when page loads
window.addEventListener('load', function() {
    console.log('Page loaded, setting up auth...');
    
    // Add event listener to sign in button
    const signInBtn = document.getElementById('sign-in-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', handleSignIn);
        console.log('Sign in button found and event listener added');
    } else {
        console.error('Sign in button not found in DOM');
    }
    
    // Initialize Clerk
    initializeClerk();
});

// Utility functions
window.clerkAuth = {
    getCurrentUser: () => clerk?.user || null,
    isSignedIn: () => !!clerk?.user,
    signOut: () => clerk?.signOut()
};