import { React, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { mockUsdcContractAddress, mockUsdcAbi } from "../config";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";
import FooterCard from "./FooterCard";

function Footer() {
  const [isMinting, setIsMinting] = useState(false);
  const [address, setAddress] = useState();

  const ownerPrivateKey = process.env.REACT_APP_PRIVATE_KEY;

  const ownerAddress = "0x22b6Dd4D6d818e2Ebce3D2E009A249F8FbF4e965";
  const value = "5000"; // testing for 1 usdc

  const copyAddress = () => {
    copy("0xF8E9F063228eb47137101eb863BF3976466AA31F");
  };

  const mintFake = async () => {
    setIsMinting(true);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://endpoints.omniatech.io/v1/fantom/testnet/public"
    );
    const wallet = new ethers.Wallet(ownerPrivateKey);
    const signer = wallet.connect(provider);
    const usdcContract = new ethers.Contract(
      mockUsdcContractAddress,
      mockUsdcAbi.abi,
      signer
    );

    try {
      const amount = ethers.utils.parseEther(value);
      const approveTx = await usdcContract.approve(ownerAddress, amount);

      await approveTx
        .wait()
        .then(() => {
          transferUsdc();
        })
        .catch((e) => {
          setIsMinting(false);
          toast.error("Transaction failed!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } catch (error) {
      setIsMinting(false);
      toast.error("Transaction failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const transferUsdc = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://endpoints.omniatech.io/v1/fantom/testnet/public"
    );
    const wallet = new ethers.Wallet(ownerPrivateKey);
    const signer = wallet.connect(provider);
    const usdcContract = new ethers.Contract(
      mockUsdcContractAddress,
      mockUsdcAbi.abi,
      signer
    );

    try {
      const amount = ethers.utils.parseEther(value);
      const tx = await usdcContract.transferFrom(ownerAddress, address, amount);

      await tx
        .wait()
        .then(() => {
          toast.success("Fake USDC received.", {
            position: toast.POSITION.TOP_CENTER,
          });
          setIsMinting(false);
        })
        .catch((e) => {
          console.log(e);
          setIsMinting(false);
        });
    } catch (error) {
      setIsMinting(false);
      toast.error("Transaction failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Container>
      <div className="pinsurance">
        <div className="text-container">
          <p className="my-pinsurance">Pinsurance</p>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-container">
          {/* Logo and Description */}
          <div className="footer-section">
            <h2 className="footer-logo">DeFi Health Insurance</h2>
            <p className="footer-description">
              A decentralized platform offering secure, transparent, and
              accessible health insurance solutions through blockchain
              technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/services">Our Services</a>
              </li>
              <li>
                <a href="/faq">FAQs</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@defihealth.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Blockchain Ave, Crypto City</p>
          </div>

          {/* Social Media Icons */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i> {/* FontAwesome icons */}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} DeFi Health Insurance. All rights
            reserved.
          </p>
        </div>
      </footer>
      

      <div className="mint-div">
        <div className="heading">
          <p>Import & Mint fake USDC for testing this dapp.</p>
        </div>
        <div className="mint-button" onClick={copyAddress}>
          <p>Click to copy fake USDC contract address.</p>
        </div>
        <div className="input-div">
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="mint-button" onClick={mintFake}>
          {!isMinting && <p>Mint 5000 USDC </p>}
          {isMinting && <ClipLoader color="#ffffff" size={13} />}
        </div>
      </div>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  border-top: 1px solid rgba(130, 71, 230, 0.4);

  background-color: rgba(10, 10, 13, 255);

  .pinsurance {
    padding-left: 20px;
    flex: 1;
    display: flex;
    justify-content: start;
    align-items: end;
    height: 100%;

    .text-container {
      height: 150px;
      width: 100%;
      display: flex;
      flex-direction: column;
      width: 600px;

      .my-pinsurance {
        margin: 0;
        font-size: 88px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  .contributor-1 {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .main-container {
      margin-left: 20px;
      border: 1px solid white;
      height: 70%;
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);

      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 2px;
      border: 2px solid rgba(255, 255, 255, 0.5);

      .image-div {
        height: 180px;
        width: 100%;
        display: flex;
        justify-content: center;

        .profile-pic-div {
          margin-top: 55px;
          height: 110px;
          width: 110px;
          border-radius: 70px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid #3adfae;

          img {
            width: 110px;
          }
        }
      }

      .name-div {
        margin-top: 10px;
        height: 100px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0px;
        p {
          margin: 0;
          margin-top: 3px;
          display: block;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
        }
      }

      .social-handle-div {
        flex: 1;
        width: 100%;
        display: flex;
        margin-left: 19px;
        justify-content: center;

        .handles {
          margin-top: 40px;
          margin-right: 20px;
          width: 30px;
          height: 30px;
          img {
            width: 100%;
          }
          transition: all 0.25s;
        }
        .handles:hover {
          scale: 1.15;
        }
      }
    }
  }

  .source-code-div {
    text-decoration: none;
    color: white;
    width: 160px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.15s;

    &:hover {
      color: #3adfae;
    }

    div {
      margin-left: -5px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 35px;

      img {
        width: 28px;
      }
    }

    p {
      font-size: 16px;
      margin-left: 5px;
    }
  }

  .mint-div {
    position: absolute;
    margin-top: 3.5rem;
    top: 2rem;
    left: 2rem;
    width: 30rem;
    height: 16rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 2px;
    border: 2px solid rgba(255, 255, 255, 0.5);

    display: flex;
    flex-direction: column;
    align-items: center;

    .heading {
      flex: 1;
      width: 90%;
      display: flex;
      justify-content: start;
      align-items: center;

      p {
        margin: 0;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5);
        letter-spacing: 1px;
      }
    }

    .input-div {
      flex: 1;
      width: 90%;

      input {
        width: 95%;
        height: 2rem;
        border-radius: 5px;
        outline: none;
        border: 2px solid rgba(255, 255, 255, 0.5);
        padding-left: 10px;

        font-size: 15px;
      }
    }

    .mint-button {
      height: 3rem;
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
      border-radius: 5px;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: color 0.15s;

      color: #ffffffe0;

      &:hover {
        color: #3adfae;
      }

      &:active {
        color: #3adfaee2;
      }

      p {
        margin: 0;
      }

      .footer-section {
        background-color:'#fcba03';
        padding: 20px;
        color: #fff;
        text-align: left;
      }

      .footer-section h3 {
        font-size: 1.5em;
        margin-bottom: 15px;
        color: #fff;
      }

      .footer-section ul {
        list-style-type: none;
        padding: 0;
      }

      .footer-section ul li {
        margin: 8px 0;
      }

      .footer-section ul li a {
        color: #ccc;
        text-decoration: none;
        font-size: 1em;
        transition: color 0.3s;
      }

      .footer-section ul li a:hover {
        color: #fff;
      }
    }
  }
`;
