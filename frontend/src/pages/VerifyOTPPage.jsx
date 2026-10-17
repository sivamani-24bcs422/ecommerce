import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyOTPMutation, useResendOTPMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: isResending }] = useResendOTPMutation();

  const { userInfo } = useSelector(state => state.auth);

  const email = location.state?.email || '';

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  const submitHandler = async e => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP.');
      return;
    }

    try {
      const res = await verifyOTP({ email, otp: otpCode }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Email verified successfully!');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP({ email }).unwrap();
      toast.success('OTP resent successfully. Please check your email.');
      setResendDisabled(true);
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Meta title={'Verify Email'} />
      <h1>Verify Your Email</h1>
      <p className='text-muted'>
        We've sent a 6-digit OTP to <strong>{email}</strong>. Please enter it below to verify your account.
      </p>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label className='text-center w-100'>Enter OTP</Form.Label>
          <div className='d-flex justify-content-center gap-2' onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <Form.Control
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className='text-center'
                style={{ width: '50px', height: '50px', fontSize: '24px', fontWeight: 'bold' }}
              />
            ))}
          </div>
        </Form.Group>
        <Button
          className='mb-3 w-100'
          variant='warning'
          type='submit'
          disabled={isLoading || otp.join('').length !== 6}
        >
          {isLoading ? <Loader /> : 'Verify OTP'}
        </Button>
      </Form>
      <Row className='py-3'>
        <Col className='text-center'>
          Didn't receive the OTP?{' '}
          {resendDisabled ? (
            <span className='text-muted'>Resend in {countdown}s</span>
          ) : (
            <Button
              variant='link'
              className='p-0'
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? 'Sending...' : 'Resend OTP'}
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <Link to='/register'>Back to Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default VerifyOTPPage;
