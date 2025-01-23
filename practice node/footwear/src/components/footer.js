import React from 'react'

const Footer = () => {
    return (
        <>
            <footer id="footer" class="footer dark-background">
                <div class="container">
                    <h3 class="sitename">DripSteps</h3>
                    <p>Step into the future of style with DripSteps – because the right drip starts from the ground up."</p>
                    <div class="social-links d-flex justify-content-center">
                        <a href="ab"><i class="bi bi-twitter-x"></i></a>
                        <a href="an"><i class="bi bi-facebook"></i></a>
                        <a href="s"><i class="bi bi-instagram"></i></a>
                        <a href="d"><i class="bi bi-skype"></i></a>
                        <a href="f"><i class="bi bi-linkedin"></i></a>
                    </div>
                    <div class="container">
                        <div class="copyright">
                            <span>shiv</span> <strong class="px-1 sitename">DripSteps</strong> <span>All Rights Reserved</span>
                        </div>
                        <div class="credits">
                            {/* <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you've purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
          <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] --> */}
                            Designed by <a href="...">Shiv K</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer