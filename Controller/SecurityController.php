<?php

namespace Brix\AdminBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;


class SecurityController extends Controller
{
  public function loginAction(Request $request)
  {
    $session = $request->getSession();

    // get the login error if there is one
    if ($request->attributes->has(SecurityContextInterface::AUTHENTICATION_ERROR)) {
      $error = $request->attributes->get(
      SecurityContextInterface::AUTHENTICATION_ERROR
    );
  } elseif (null !== $session && $session->has(SecurityContextInterface::AUTHENTICATION_ERROR)) {
    $error = $session->get(SecurityContextInterface::AUTHENTICATION_ERROR);
    $session->remove(SecurityContextInterface::AUTHENTICATION_ERROR);
  } else {
    $error = '';
  }

  // last username entered by the user
  $lastUsername = (null === $session) ? '' : $session->get(SecurityContextInterface::LAST_USERNAME);

  return $this->render(
  'BrixAdminBundle:Security:login.html.twig',
  array(
    // last username entered by the user
    'last_username' => $lastUsername,
    'error'         => $error,
  )
);
}

/**
* @Template
*/
public function adminFooterAction(){
  if (!$this->isAdminMode()) {
    return new Response();
  } else{
    return array();
  }
}

/**
* @Template
*/
public function adminHeaderAction(){
  if (!$this->isAdminMode()) {
    return new Response();
  } else{
    return array();
  }
}


private function isAdminMode(){
    $session = $this->getRequest()->getSession();

    $admin = $this->get('security.context')->isGranted('ROLE_ADMIN');
    $adminsession = $session->get('adminmode',false);

    return ($admin && $adminsession);
}


}
