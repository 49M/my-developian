export default function ConfirmEmail() {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-4 text-xl font-bold'>Confirm your email</h2>
        <p>
          We’ve sent a confirmation link to your email. <br />
          Please check your inbox and confirm to complete your registration.
        </p>
      </div>
    </div>
  );
}
